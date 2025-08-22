# ✅ CuretCore v2 - Checklist de Implementación

## 📋 Pre-requisitos
- [ ] Dominio curetcore.com configurado
- [ ] Acceso a servidor EasyPanel
- [ ] Acceso a PostgreSQL en panel.curetshop.com:5432
- [ ] Cuenta GitHub para repositorio
- [ ] Acceso a datos de Airbyte sincronizados

## 🚀 Fase 1: Setup Inicial (Día 1)

### **1. Preparación del Entorno**
```bash
# Crear estructura de proyecto
mkdir -p ~/Desktop/curetcore/{frontend,backend,docs,scripts,nginx}
cd ~/Desktop/curetcore

# Inicializar Git
git init
echo "node_modules/\n.env\n.env.local\ndist/\n.next/\n*.log" > .gitignore
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub
gh repo create curetshop/curetcore --private
git remote add origin https://github.com/curetshop/curetcore.git
git push -u origin main
```

### **2. Setup Frontend**
```bash
cd frontend

# Crear Next.js app con configuración específica
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Instalar dependencias necesarias
npm install @tanstack/react-query@5.8.4 zustand@4.4.7 axios@1.6.2 \
  lucide-react@0.294.0 recharts@2.10.3 date-fns@3.0.6 \
  react-hook-form@7.48.2 zod@3.22.4 @hookform/resolvers@3.3.2

# Instalar shadcn/ui
npx shadcn-ui@latest init -y
npx shadcn-ui@latest add button card form input label toast

# Configurar TypeScript paths en tsconfig.json
```

### **3. Setup Backend**
```bash
cd ../backend

# Inicializar proyecto Node.js
npm init -y

# Instalar dependencias
npm install express@4.18.2 cors@2.8.5 helmet@7.1.0 \
  jsonwebtoken@9.0.2 bcryptjs@2.4.3 dotenv@16.3.1 \
  pg@8.11.3 redis@4.6.11 express-rate-limit@7.1.5 \
  winston@3.11.0 compression@1.7.4 express-validator@7.0.1

# Instalar dev dependencies
npm install -D typescript@5.3.3 @types/node@20.10.5 \
  @types/express@4.17.21 @types/cors@2.8.17 \
  @types/jsonwebtoken@9.0.5 @types/bcryptjs@2.4.6 \
  @types/pg@8.10.9 tsx@4.7.0 nodemon@3.0.2 \
  @typescript-eslint/eslint-plugin@6.15.0 eslint@8.56.0

# Configurar TypeScript
npx tsc --init
```

### **4. Configuración Base de Datos**
```sql
-- Conectar a PostgreSQL
psql postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse

-- Crear esquema y tablas base
CREATE SCHEMA IF NOT EXISTS curetcore;

-- Crear usuario inicial
INSERT INTO curetcore.users (email, password_hash, first_name, last_name, role)
VALUES (
  'admin@curetcore.com',
  '$2a$10$YourHashedPasswordHere', -- Generar con bcrypt
  'Admin',
  'CuretCore',
  'super_admin'
);
```

## 📱 Fase 2: Desarrollo Core (Día 2-3)

### **1. Implementar Autenticación**

#### **Backend - Auth Controller**
- [ ] POST /api/auth/login
- [ ] POST /api/auth/logout
- [ ] POST /api/auth/refresh
- [ ] GET /api/auth/me
- [ ] Middleware de autenticación JWT

#### **Frontend - Auth Flow**
- [ ] Página de login con diseño
- [ ] Context de autenticación
- [ ] Hook useAuth
- [ ] Protección de rutas privadas
- [ ] Interceptor de axios para tokens

### **2. Implementar Layout Principal**

#### **Componentes Base**
- [ ] Sidebar con navegación
- [ ] Header con user info
- [ ] Footer minimalista
- [ ] Dark/Light mode toggle
- [ ] Layout responsive

#### **Páginas Iniciales**
- [ ] /login - Página de login
- [ ] /dashboard - Dashboard principal
- [ ] /404 - Página de error
- [ ] /500 - Error del servidor

### **3. Implementar Widgets de Ventas**

#### **Backend - Sales Endpoints**
```typescript
// Endpoints a implementar
GET /api/sales/today        // Ventas del día
GET /api/sales/month        // Ventas del mes
GET /api/sales/products/top // Top 5 productos
GET /api/sales/hourly       // Distribución horaria
```

#### **Frontend - Sales Widgets**
- [ ] SalesMetricCard - Card de métrica individual
- [ ] DailySalesWidget - Ventas del día con comparación
- [ ] MonthlyProgressWidget - Progreso mensual vs meta
- [ ] TopProductsWidget - Lista de top productos
- [ ] HourlySalesChart - Gráfico de barras por hora

### **4. Configurar Refresco de Datos**
- [ ] React Query para caché y refetch
- [ ] Auto-refresh cada 5 minutos
- [ ] Loading states con skeletons
- [ ] Error boundaries

## 🚢 Fase 3: Deployment (Día 4)

### **1. Preparar para Producción**

#### **Optimizaciones Frontend**
```bash
# Configurar next.config.js
module.exports = {
  output: 'standalone',
  images: {
    domains: ['curetcore.com'],
  },
  compress: true,
  poweredByHeader: false,
}

# Build de producción
npm run build
```

#### **Optimizaciones Backend**
```bash
# Compilar TypeScript
npm run build

# Verificar bundle size
npm run analyze
```

### **2. Dockerizar Aplicaciones**
- [ ] Crear Dockerfile para frontend
- [ ] Crear Dockerfile para backend
- [ ] Crear docker-compose.yml
- [ ] Probar localmente con docker-compose up

### **3. Configurar EasyPanel**

#### **En EasyPanel Dashboard**
1. [ ] Crear nueva aplicación "curetcore"
2. [ ] Configurar Git repository
3. [ ] Agregar variables de entorno:
   ```
   # Frontend
   NEXT_PUBLIC_API_URL=https://api.curetcore.com
   NEXT_PUBLIC_APP_NAME=CuretCore
   NEXT_PUBLIC_APP_VERSION=2.0.0
   
   # Backend
   DATABASE_URL=postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse
   JWT_SECRET=[generar con openssl rand -base64 32]
   JWT_REFRESH_SECRET=[generar con openssl rand -base64 32]
   REDIS_URL=redis://redis:6379
   ```

4. [ ] Configurar dominios:
   - core.curetcore.com → Frontend (puerto 3000)
   - api.curetcore.com → Backend (puerto 3001)

5. [ ] Habilitar SSL con Let's Encrypt

6. [ ] Configurar health checks

### **4. Deploy y Verificación**
```bash
# Push código a GitHub
git add .
git commit -m "Initial release v2.0.0"
git push origin main

# EasyPanel detectará el push y comenzará el deploy
```

#### **Verificaciones Post-Deploy**
- [ ] https://core.curetcore.com carga correctamente
- [ ] https://api.curetcore.com/health responde OK
- [ ] Login funciona con credenciales
- [ ] Dashboard muestra datos reales
- [ ] Las métricas se actualizan cada 5 minutos
- [ ] Dark mode funciona
- [ ] Es responsive en móvil

## 🔧 Configuraciones Adicionales

### **1. Monitoring**
```bash
# Configurar Sentry (opcional)
npm install @sentry/nextjs @sentry/node

# En frontend
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: 'production',
})

# En backend
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: 'production',
})
```

### **2. Analytics**
```html
<!-- Google Analytics en frontend -->
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### **3. Backups Automáticos**
```bash
# Cron job en servidor
0 2 * * * /home/curetcore/scripts/backup.sh
```

## 📝 Testing Final

### **Functional Testing**
- [ ] Login/Logout flow completo
- [ ] Todas las métricas cargan datos
- [ ] Los filtros de fecha funcionan
- [ ] Export a CSV funciona
- [ ] Cambio de tema persiste
- [ ] Errores se manejan gracefully

### **Performance Testing**
- [ ] Lighthouse score > 90
- [ ] Time to Interactive < 3s
- [ ] API responses < 200ms
- [ ] No memory leaks

### **Security Testing**
- [ ] HTTPS forzado
- [ ] Headers de seguridad configurados
- [ ] Rate limiting activo
- [ ] SQL injection protegido
- [ ] XSS prevenido

## 🎉 Go Live!

### **Comunicación**
1. [ ] Notificar al equipo del nuevo sistema
2. [ ] Crear credenciales para usuarios
3. [ ] Programar training session
4. [ ] Documentar FAQs comunes

### **Monitoreo Post-Launch**
- [ ] Verificar logs las primeras 24h
- [ ] Monitorear uso de recursos
- [ ] Recopilar feedback de usuarios
- [ ] Planificar mejoras para v2.1

---

**¡Felicitaciones! CuretCore v2 está en producción** 🚀

Para soporte o dudas: admin@curetcore.com