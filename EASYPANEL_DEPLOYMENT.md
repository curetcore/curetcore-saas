# 🚀 Guía de Deployment en EasyPanel - CuretCore

## Pre-requisitos

- ✅ Cuenta en EasyPanel
- ✅ Dominio curetcore.com configurado
- ✅ Acceso al repositorio GitHub
- ✅ Base de datos PostgreSQL configurada

## Paso 1: Preparar el Repositorio

### 1.1 Verificar archivos necesarios

Asegúrate de que estos archivos estén en el repositorio:
- `frontend/Dockerfile`
- `backend/Dockerfile`
- `docker-compose.prod.yml`
- `easypanel.json`

### 1.2 Push cambios a GitHub

```bash
git add .
git commit -m "Add production deployment files"
git push origin main
```

## Paso 2: Configurar en EasyPanel

### 2.1 Crear Nueva Aplicación

1. Acceder a EasyPanel: https://panel.curetshop.com
2. Click en "Create App"
3. Nombre de la app: `curetcore`
4. Tipo: "Git Repository"

### 2.2 Configurar Repositorio

```
Repository URL: https://github.com/curetcore/curetcore-saas.git
Branch: main
Build Path: /
```

### 2.3 Configurar Servicios

EasyPanel detectará automáticamente el `docker-compose.prod.yml`. Si no, configura manualmente:

#### **Frontend Service**

```yaml
Name: frontend
Source: ./frontend
Dockerfile: ./frontend/Dockerfile
Port: 3000
Domain: core.curetcore.com
HTTPS: Enabled (Let's Encrypt)
```

**Variables de Entorno:**
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.curetcore.com
NEXT_PUBLIC_APP_NAME=CuretCore
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_COMPANY_NAME=Curetshop
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

#### **Backend Service**

```yaml
Name: backend
Source: ./backend
Dockerfile: ./backend/Dockerfile
Port: 3001
Domain: api.curetcore.com
HTTPS: Enabled (Let's Encrypt)
```

**Variables de Entorno:**
```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:Pitagora@@147.93.177.156:5432/warehouse?sslmode=disable
DATABASE_SSL=false
JWT_SECRET=[GENERAR_NUEVO]
JWT_REFRESH_SECRET=[GENERAR_NUEVO]
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
REDIS_URL=redis://redis:6379
CORS_ORIGIN=https://core.curetcore.com
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

#### **Redis Service**

```yaml
Name: redis
Image: redis:7-alpine
Internal: true (no external access)
```

### 2.4 Generar Secrets

Genera nuevos secrets para producción:

```bash
# Generar JWT_SECRET
openssl rand -base64 32

# Generar JWT_REFRESH_SECRET
openssl rand -base64 32
```

Agregar en la sección "Secrets" de EasyPanel:
- `JWT_SECRET`: [valor generado]
- `JWT_REFRESH_SECRET`: [valor generado]

## Paso 3: Configurar Dominios

### 3.1 DNS Configuration

Agregar registros DNS en tu proveedor:

```
core.curetcore.com    A    [IP_DE_EASYPANEL]
api.curetcore.com     A    [IP_DE_EASYPANEL]
```

O si usas Cloudflare con proxy:
```
core.curetcore.com    CNAME    tu-app.easypanel.host
api.curetcore.com     CNAME    tu-app.easypanel.host
```

### 3.2 SSL Certificates

EasyPanel generará automáticamente certificados SSL con Let's Encrypt.

## Paso 4: Deploy

### 4.1 Primer Deploy

1. Click en "Deploy" en EasyPanel
2. Seleccionar "Deploy from Git"
3. EasyPanel:
   - Clonará el repositorio
   - Construirá las imágenes Docker
   - Iniciará los servicios

### 4.2 Monitorear Deploy

- Ver logs en tiempo real
- Verificar que todos los servicios estén "Running"
- Esperar a que los health checks pasen

## Paso 5: Verificación Post-Deploy

### 5.1 Verificar Frontend

```bash
# Verificar que el frontend responde
curl https://core.curetcore.com

# Verificar redirección HTTP a HTTPS
curl -I http://core.curetcore.com
```

### 5.2 Verificar Backend

```bash
# Verificar health endpoint
curl https://api.curetcore.com/health

# Respuesta esperada:
# {"status":"OK","version":"2.0.0"}
```

### 5.3 Test Login

1. Navegar a https://core.curetcore.com
2. Debería redirigir a /login
3. Iniciar sesión con:
   - Email: admin@curetcore.com
   - Password: CuretAdmin2024!

## Paso 6: Configuración Adicional

### 6.1 Backups Automáticos

En EasyPanel, configurar:
- Backup diario de la base de datos
- Backup de volúmenes de Redis

### 6.2 Monitoreo

Configurar alertas para:
- Servicios caídos
- Uso alto de CPU/memoria
- Errores 5xx

### 6.3 Auto-scaling (Opcional)

```yaml
backend:
  autoscale:
    min: 2
    max: 5
    cpu: 70%
    memory: 80%
```

## Troubleshooting

### Error: "Cannot connect to database"

1. Verificar que la IP de EasyPanel tenga acceso a PostgreSQL
2. Verificar variables de entorno
3. Probar conexión desde el contenedor:
   ```bash
   docker exec -it curetcore-backend sh
   nc -zv 147.93.177.156 5432
   ```

### Error: "CORS error"

1. Verificar CORS_ORIGIN en backend
2. Asegurar que coincida exactamente con el dominio frontend
3. Incluir https://

### Error: "502 Bad Gateway"

1. Verificar que los servicios estén corriendo
2. Revisar logs del servicio afectado
3. Verificar configuración de puertos

## Comandos Útiles en EasyPanel

```bash
# Ver logs
easypanel logs curetcore-frontend
easypanel logs curetcore-backend

# Reiniciar servicio
easypanel restart curetcore-backend

# Ejecutar comando en contenedor
easypanel exec curetcore-backend sh

# Ver estado de servicios
easypanel ps
```

## Actualizaciones Futuras

Para actualizar la aplicación:

1. Hacer cambios en el código
2. Commit y push a GitHub
3. En EasyPanel: Click "Redeploy"
4. EasyPanel automáticamente:
   - Detectará cambios
   - Construirá nuevas imágenes
   - Realizará rolling update

## Rollback

Si algo sale mal:
1. En EasyPanel, ir a "Deployments"
2. Seleccionar versión anterior
3. Click "Rollback"

## 🎉 ¡Listo!

Tu aplicación CuretCore debería estar corriendo en:
- Frontend: https://core.curetcore.com
- API: https://api.curetcore.com

## Checklist Final

- [ ] Frontend accesible en https://core.curetcore.com
- [ ] API respondiendo en https://api.curetcore.com/health
- [ ] Login funcionando con usuario admin
- [ ] Widgets mostrando datos (aunque sean mock por ahora)
- [ ] SSL funcionando correctamente
- [ ] Logs sin errores críticos