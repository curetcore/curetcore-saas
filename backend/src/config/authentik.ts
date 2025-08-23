const { Issuer, generators } = require('openid-client');
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';

// Configuración de Authentik
export const authentikConfig = {
  issuer: process.env.AUTHENTIK_URL || 'http://147.93.177.156:9000',
  clientId: process.env.AUTHENTIK_CLIENT_ID || 'curetcore',
  clientSecret: process.env.AUTHENTIK_CLIENT_SECRET || '',
  redirectUri: process.env.AUTHENTIK_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  scope: 'openid profile email',
};

let authentikClient: any = null;

export async function getAuthentikClient() {
  if (authentikClient) return authentikClient;
  
  try {
    // Descubrir la configuración de Authentik
    const issuer = await Issuer.discover(authentikConfig.issuer);
    
    // Crear cliente OAuth2
    authentikClient = new issuer.Client({
      client_id: authentikConfig.clientId,
      client_secret: authentikConfig.clientSecret,
      redirect_uris: [authentikConfig.redirectUri],
      response_types: ['code'],
    });
    
    return authentikClient;
  } catch (error) {
    console.error('Error al conectar con Authentik:', error);
    throw error;
  }
}

// Cliente JWKS para validar tokens
const jwks = jwksClient({
  jwksUri: `${authentikConfig.issuer}/application/o/curetcore/jwks/`,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000, // 10 minutos
});

// Función para obtener la clave de firma
function getKey(header: any, callback: any) {
  jwks.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

// Validar token de Authentik
export function validateAuthentikToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {
      issuer: authentikConfig.issuer,
      audience: authentikConfig.clientId,
    }, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
}

// Generar URL de login
export function generateLoginUrl() {
  const state = generators.state();
  const nonce = generators.nonce();
  
  const params = new URLSearchParams({
    client_id: authentikConfig.clientId,
    redirect_uri: authentikConfig.redirectUri,
    response_type: 'code',
    scope: authentikConfig.scope,
    state,
    nonce,
  });
  
  return {
    url: `${authentikConfig.issuer}/application/o/authorize/?${params.toString()}`,
    state,
    nonce,
  };
}

// Generar URL de logout
export function generateLogoutUrl(idToken?: string) {
  const params = new URLSearchParams({
    id_token_hint: idToken || '',
    post_logout_redirect_uri: process.env.AUTHENTIK_POST_LOGOUT_URI || 'http://localhost:3000',
  });
  
  return `${authentikConfig.issuer}/application/o/curetcore/end-session/?${params.toString()}`;
}