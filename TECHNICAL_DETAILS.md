# CuretCore v2 - Documentación Técnica Detallada

## 🏗️ Arquitectura del Sistema

### Estructura del Proyecto
```
curetcore/
├── frontend/                 # Next.js 14 App
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilidades
│   │   └── types/          # TypeScript types
│   ├── public/             # Assets estáticos
│   ├── server.js           # Servidor custom para SIGTERM
│   └── Procfile            # Configuración EasyPanel
│
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── config/         # Configuraciones
│   │   ├── controllers/    # Controladores
│   │   ├── middleware/     # Middlewares
│   │   ├── routes/         # Rutas API
│   │   ├── services/       # Lógica de negocio
│   │   └── server.ts       # Entry point
│   ├── wrapper.js          # Wrapper para SIGTERM
│   └── Procfile            # Configuración EasyPanel
│
└── database/               # Scripts SQL
    └── schema.sql          # Esquema de base de datos
```

## 🔧 Configuraciones Clave

### Frontend - Next.js Configuration

**next.config.js**
```javascript
const nextConfig = {
  images: {
    domains: ['localhost', 'curetcore.com'],
  },
  // Removido 'standalone' para Buildpack
}
```

**server.js** - Manejo custom de SIGTERM
```javascript
// Tracking de conexiones
const connections = new Set();

// Graceful shutdown con 30s timeout
const gracefulShutdown = (signal) => {
  server.close(() => {
    process.exit(0);
  });
  
  setTimeout(() => {
    process.exit(1);
  }, 30000);
};
```

### Backend - Express Configuration

**Middleware Stack**
1. Helmet - Seguridad headers
2. CORS - Multi-origen support
3. Compression - Gzip responses
4. Rate Limiting - 100 req/15min
5. Body Parser - JSON/URL-encoded

**Database Connection** con resiliencia:
```typescript
// Mock fallback si DB no disponible
if (!dbAvailable) {
  console.log('Using mock authentication');
  return mockAuthService.login(email, password);
}
```

## 🎨 Sistema de Componentes

### Componentes Base

1. **Layout Components**
   - `Header` - Con logo, búsqueda, notificaciones
   - `Sidebar` - Colapsable con mini-mode
   - `Footer` - Estadísticas y créditos

2. **UI Components**
   - `Card` - Contenedor base
   - `Button` - Variantes y estados
   - `Progress` - Barras de progreso
   - `SimpleTooltip` - Tooltips informativos

3. **Widget Components**
   - Todos extienden base pattern
   - Props: `dateRange`, `className`
   - Loading/Error/Empty states

### Patrones de Diseño

**Container/Presentational Pattern**
```typescript
// Container (smart)
export function DashboardPage() {
  const [dateRange, setDateRange] = useState(null);
  // lógica...
  return <DailySalesWidget dateRange={dateRange} />;
}

// Presentational (dumb)
export function DailySalesWidget({ dateRange }) {
  // solo presentación
}
```

**Custom Hooks Pattern**
```typescript
// Reutilizable
const { user, login, logout } = useAuth();
const { theme, toggleTheme } = useTheme();
const { addToast } = useToast();
```

## 🔐 Sistema de Autenticación

### JWT Flow
1. Login → Backend valida credenciales
2. Backend genera JWT (24h expiry)
3. Frontend almacena en localStorage
4. Requests incluyen `Authorization: Bearer {token}`
5. Backend valida JWT en cada request

### Authentik Integration
```typescript
// OAuth2 flow
GET /api/authentik/login
→ Redirect to Authentik
→ User authenticates
→ Callback to /api/authentik/callback
→ Exchange code for tokens
→ Generate internal JWT
```

## 📊 Manejo de Estado

### Client State (Zustand)
```typescript
// authStore.ts
interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

### Server State (React Query)
```typescript
// Configuración futura
const { data, isLoading, error } = useQuery({
  queryKey: ['sales', dateRange],
  queryFn: () => fetchSales(dateRange),
  staleTime: 5 * 60 * 1000, // 5 minutos
});
```

## 🚀 Optimizaciones de Performance

1. **Code Splitting**
   - Lazy loading de rutas
   - Dynamic imports para charts

2. **Image Optimization**
   - Next.js Image component
   - Lazy loading automático

3. **Bundle Size**
   - Tree shaking
   - Minificación en build

4. **Caching**
   - Static assets con cache headers
   - API responses con ETags (futuro)

## 🛡️ Seguridad

### Frontend
- Content Security Policy via meta tags
- XSS prevention con React
- HTTPS only en producción

### Backend
- Helmet.js para headers seguros
- Rate limiting por IP
- Input validation con express-validator
- SQL injection prevention con parameterized queries
- JWT con secrets seguros

## 📝 Variables de Entorno

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://api.curetcore.com
NEXT_PUBLIC_APP_NAME=CuretCore
NEXT_PUBLIC_APP_VERSION=2.0.0
```

### Backend (.env)
```bash
PORT=3001
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://curetcore.com

# Authentik
AUTHENTIK_BASE_URL=http://147.93.177.156:9000
AUTHENTIK_CLIENT_ID=your-client-id
AUTHENTIK_CLIENT_SECRET=your-client-secret
```

## 🐛 Debugging y Troubleshooting

### Common Issues

1. **SIGTERM en EasyPanel**
   - Solución: Custom server con graceful shutdown
   - Wrapper script con delay de 5s

2. **Database Connection Timeout**
   - Solución: Mock service fallback
   - Health checks independientes de DB

3. **CORS Errors**
   - Verificar allowedOrigins en backend
   - Incluir credentials: true

### Logging
```typescript
// Backend logging
console.log(`[${timestamp}] ${level}: ${message}`);

// Health checks cada 30s
[2025-08-23T10:00:00.000Z] Health: OK | Memory: 45MB | Connections: 3
```

## 🔄 CI/CD Pipeline

1. **Development**
   - Local con `npm run dev`
   - Hot reload en ambos servicios

2. **Deployment**
   - Push to GitHub main branch
   - EasyPanel webhook trigger
   - Buildpack build process
   - Zero-downtime deployment

## 📚 Recursos y Referencias

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [EasyPanel Buildpack Docs](https://easypanel.io/docs)
- [Authentik OAuth2 Guide](https://goauthentik.io/docs/)

---

*Documento técnico para referencia del equipo de desarrollo*