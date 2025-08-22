# 🚀 CuretCore v2 - Fase 1: MVP Funcional

## 📋 Resumen Ejecutivo

**Objetivo**: Crear un dashboard funcional mínimo que muestre métricas de ventas en tiempo real desde PostgreSQL (datos de Airbyte), con autenticación segura y diseño profesional.

**Duración**: 3-4 días
**Stack**: Next.js 14 + TypeScript + PostgreSQL + JWT

## 🎯 Funcionalidades de la Fase 1

### 1. **Autenticación Completa**
- ✅ Login con email/contraseña
- ✅ JWT tokens seguros (httpOnly cookies)
- ✅ Logout funcional
- ✅ Protección de rutas
- ✅ Página de login con diseño profesional

### 2. **Dashboard Principal**
- ✅ Layout con sidebar colapsable
- ✅ Header con info del usuario
- ✅ Dark/Light mode (como v1)
- ✅ Responsive design
- ✅ 4 métricas principales de ventas

### 3. **Widgets de Ventas (Datos Reales)**
```typescript
// Métricas que se mostrarán:
1. Ventas del Día
   - Total en RD$
   - Número de órdenes
   - Ticket promedio
   - % cambio vs ayer

2. Ventas del Mes
   - Total acumulado
   - Progreso vs meta
   - Días restantes
   - Proyección fin de mes

3. Top 5 Productos
   - Nombre del producto
   - Unidades vendidas
   - Ingreso generado
   - % del total

4. Ventas por Hora
   - Gráfico de barras simple
   - Horas pico identificadas
   - Comparación con promedio
```

### 4. **Conexión a Datos Reales**
```sql
-- Queries optimizadas para PostgreSQL
-- Usando las tablas de Shopify via Airbyte

-- Ventas del día
SELECT 
  COUNT(DISTINCT id) as total_orders,
  SUM(total_price::decimal) as total_revenue,
  AVG(total_price::decimal) as avg_ticket
FROM shopify_orders
WHERE DATE(created_at) = CURRENT_DATE
  AND financial_status = 'paid';

-- Top productos
SELECT 
  li.title as product_name,
  SUM(li.quantity) as units_sold,
  SUM(li.price::decimal * li.quantity) as revenue
FROM shopify_line_items li
JOIN shopify_orders o ON li.order_id = o.id
WHERE DATE(o.created_at) = CURRENT_DATE
GROUP BY li.title
ORDER BY revenue DESC
LIMIT 5;
```

## 🏗️ Arquitectura Técnica

### **Estructura del Proyecto**
```
curetcore/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx      # Sidebar + Header
│   │   │   └── page.tsx        # Dashboard principal
│   │   └── api/
│   │       └── auth/
│   │           └── [...auth].ts
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── widgets/
│   │       ├── SalesMetricCard.tsx
│   │       ├── MonthlyProgress.tsx
│   │       ├── TopProducts.tsx
│   │       └── HourlySales.tsx
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   ├── auth.ts             # Auth utilities
│   │   └── utils.ts            # Formatters
│   └── hooks/
│       ├── useAuth.ts
│       └── useSalesData.ts
│
├── backend/
│   ├── src/
│   │   ├── server.ts           # Express server
│   │   ├── config/
│   │   │   └── database.ts     # PostgreSQL connection
│   │   ├── middleware/
│   │   │   └── auth.ts         # JWT validation
│   │   ├── routes/
│   │   │   ├── auth.routes.ts  # Login/Logout
│   │   │   └── sales.routes.ts # Sales metrics
│   │   └── services/
│   │       ├── auth.service.ts
│   │       └── sales.service.ts
│   ├── .env
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

### **Componentes Clave**

#### 1. **MetricCard Component**
```tsx
interface MetricCardProps {
  title: string
  value: number | string
  format?: 'currency' | 'number' | 'percent'
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: LucideIcon
  loading?: boolean
}

// Uso:
<MetricCard
  title="Ventas Hoy"
  value={salesData.revenue}
  format="currency"
  trend={{ value: 12.5, isPositive: true }}
  icon={DollarSign}
/>
```

#### 2. **API Endpoints**
```typescript
// Auth endpoints
POST   /api/auth/login     # Login con email/password
POST   /api/auth/logout    # Logout
POST   /api/auth/refresh   # Refresh token
GET    /api/auth/me        # Usuario actual

// Sales endpoints
GET    /api/sales/today    # Métricas del día
GET    /api/sales/month    # Métricas del mes
GET    /api/sales/products/top # Top productos
GET    /api/sales/hourly   # Ventas por hora
```

## 🚀 Plan de Implementación

### **Día 1: Setup y Auth**
- [ ] Inicializar proyecto Next.js con TypeScript
- [ ] Configurar Tailwind + shadcn/ui
- [ ] Crear backend con Express
- [ ] Implementar JWT auth
- [ ] Página de login funcional
- [ ] Conexión a PostgreSQL

### **Día 2: Layout y Dashboard**
- [ ] Implementar Sidebar (colapsable)
- [ ] Crear Header con user info
- [ ] Layout responsive
- [ ] Dark/Light mode
- [ ] Página dashboard vacía
- [ ] Protección de rutas

### **Día 3: Widgets y Datos**
- [ ] Conectar a datos reales de PostgreSQL
- [ ] Implementar 4 widgets de ventas
- [ ] Formatters de moneda (RD$)
- [ ] Loading states
- [ ] Error handling
- [ ] Auto-refresh (5 min)

### **Día 4: Polish y Deploy**
- [ ] Optimizar queries
- [ ] Agregar animaciones
- [ ] Testing básico
- [ ] Documentación
- [ ] Deploy a EasyPanel
- [ ] Configurar variables de entorno en EasyPanel

## 📦 Dependencias Principales

### **Frontend**
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "typescript": "5.x",
    "@tanstack/react-query": "5.x",
    "zustand": "4.x",
    "axios": "1.x",
    "date-fns": "3.x",
    "lucide-react": "latest",
    "recharts": "2.x",
    "tailwindcss": "3.x",
    "@radix-ui/react-*": "latest"
  }
}
```

### **Backend**
```json
{
  "dependencies": {
    "express": "4.x",
    "jsonwebtoken": "9.x",
    "bcryptjs": "2.x",
    "pg": "8.x",
    "cors": "2.x",
    "dotenv": "16.x",
    "zod": "3.x"
  }
}
```

## 🔧 Configuración Inicial Detallada

### **1. Variables de Entorno**
```env
# Backend (.env)
# Base de datos PostgreSQL (tu servidor actual)
DATABASE_URL=postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse
DATABASE_SSL=false

# JWT Secrets (generar con: openssl rand -base64 32)
JWT_SECRET=your-32-character-secret-key-here
JWT_REFRESH_SECRET=your-32-character-refresh-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Server Config
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://core.curetcore.com

# Redis (para sesiones)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.curetcore.com
NEXT_PUBLIC_APP_NAME=CuretCore
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_COMPANY_NAME=Curetshop

# Tiempo de refresco de datos (ms)
NEXT_PUBLIC_REFRESH_INTERVAL=300000 # 5 minutos
```

### **2. Configuración de Base de Datos**
```sql
-- Verificar conexión y estructura
-- Las tablas ya existen via Airbyte, solo necesitamos índices

-- Índices para optimizar queries de ventas
CREATE INDEX IF NOT EXISTS idx_shopify_orders_created_at ON shopify_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_shopify_orders_financial_status ON shopify_orders(financial_status);
CREATE INDEX IF NOT EXISTS idx_shopify_line_items_order_id ON shopify_line_items(order_id);

-- Vista materializada para métricas diarias (opcional pero recomendado)
CREATE MATERIALIZED VIEW IF NOT EXISTS daily_sales_metrics AS
SELECT 
    DATE(created_at) as sale_date,
    COUNT(DISTINCT id) as total_orders,
    SUM(total_price::decimal) as total_revenue,
    AVG(total_price::decimal) as avg_ticket,
    COUNT(DISTINCT customer_id) as unique_customers
FROM shopify_orders
WHERE financial_status = 'paid'
GROUP BY DATE(created_at)
WITH DATA;

-- Refresh automático cada hora
CREATE OR REPLACE FUNCTION refresh_daily_metrics()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales_metrics;
END;
$$ LANGUAGE plpgsql;
```

### **3. Docker Compose Completo**
```yaml
version: '3.8'

services:
  # Frontend Next.js
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: curetcore-frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - ./frontend/.env.local
    depends_on:
      - backend
    restart: unless-stopped

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: curetcore-backend
    ports:
      - "3001:3001"
    env_file:
      - ./backend/.env
    depends_on:
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis para caché y sesiones
  redis:
    image: redis:7-alpine
    container_name: curetcore-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

  # Nginx como reverse proxy (opcional pero recomendado)
  nginx:
    image: nginx:alpine
    container_name: curetcore-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  redis_data:
    driver: local
```

### **4. Configuración de Nginx**
```nginx
# nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:3001;
    }

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name core.curetcore.com api.curetcore.com;
        return 301 https://$server_name$request_uri;
    }

    # Frontend
    server {
        listen 443 ssl http2;
        server_name core.curetcore.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # Backend API
    server {
        listen 443 ssl http2;
        server_name api.curetcore.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        location / {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
        }
    }
}
```

## ✅ Criterios de Éxito

1. **Usuario puede**:
   - ✓ Hacer login con credenciales
   - ✓ Ver dashboard con 4 métricas
   - ✓ Datos actualizados en tiempo real
   - ✓ Cambiar entre dark/light mode
   - ✓ Hacer logout

2. **Sistema debe**:
   - ✓ Cargar en < 3 segundos
   - ✓ Ser responsive
   - ✓ Manejar errores gracefully
   - ✓ Refrescar datos automáticamente
   - ✓ Mantener sesión segura

## 🎨 Referencias de Diseño

- **Login**: Similar al v1 pero más minimalista
- **Dashboard**: Layout tipo Shopify del v1
- **Colores**: Blue-600 primario, grays para UI
- **Tipografía**: Inter/System fonts
- **Espaciado**: Sistema de 8px
- **Componentes**: shadcn/ui para consistencia

## 🚨 Consideraciones Importantes

1. **Seguridad**:
   - JWT en httpOnly cookies
   - CORS configurado correctamente
   - Validación con Zod
   - Rate limiting básico

2. **Performance**:
   - Queries optimizadas con índices
   - Lazy loading de componentes
   - Caché en cliente con React Query
   - Compresión gzip

3. **UX**:
   - Loading states en todo
   - Mensajes de error claros
   - Feedback visual inmediato
   - Accesibilidad básica (a11y)

## 🚢 Deployment en EasyPanel

### **1. Preparación de Archivos Docker**

#### **Frontend Dockerfile**
```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### **Backend Dockerfile**
```dockerfile
# backend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV production
RUN apk add --no-cache tini

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

USER node
EXPOSE 3001

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/server.js"]
```

### **2. Configuración en EasyPanel**

#### **Paso 1: Crear Aplicación**
```yaml
# En EasyPanel Dashboard
1. Click "Create App"
2. Nombre: curetcore
3. Tipo: Docker Compose
4. Git Repository: https://github.com/tuusuario/curetcore
5. Branch: main
```

#### **Paso 2: Variables de Entorno en EasyPanel**
```bash
# Frontend Environment
NEXT_PUBLIC_API_URL=https://api.curetcore.com
NEXT_PUBLIC_APP_NAME=CuretCore
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_COMPANY_NAME=Curetshop
NEXT_PUBLIC_REFRESH_INTERVAL=300000

# Backend Environment
DATABASE_URL=postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse
JWT_SECRET=<generar-con-openssl>
JWT_REFRESH_SECRET=<generar-con-openssl>
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=production
CORS_ORIGIN=https://core.curetcore.com
REDIS_URL=redis://redis:6379
```

#### **Paso 3: Dominios y SSL**
```yaml
# En EasyPanel > Domains
Frontend:
  - Domain: core.curetcore.com
  - SSL: Let's Encrypt (auto)
  - Port: 3000

Backend:
  - Domain: api.curetcore.com
  - SSL: Let's Encrypt (auto)
  - Port: 3001
```

### **3. Scripts de Utilidad**

#### **deploy.sh**
```bash
#!/bin/bash
# Script para deploy manual

echo "🚀 Iniciando deploy de CuretCore v2..."

# Build images
echo "📦 Building Docker images..."
docker-compose build

# Push to registry (si usas uno)
# docker-compose push

# Deploy
echo "🔄 Deploying to EasyPanel..."
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo "✅ Deploy completado!"
echo "🔗 Frontend: https://core.curetcore.com"
echo "🔗 API: https://api.curetcore.com"
```

#### **health-check.sh**
```bash
#!/bin/bash
# Verificar salud del sistema

API_URL="https://api.curetcore.com/health"
FRONTEND_URL="https://core.curetcore.com"

echo "🏥 Verificando salud del sistema..."

# Check API
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)
if [ $API_STATUS -eq 200 ]; then
    echo "✅ API: Operacional"
else
    echo "❌ API: Error (Status: $API_STATUS)"
fi

# Check Frontend
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
if [ $FRONTEND_STATUS -eq 200 ]; then
    echo "✅ Frontend: Operacional"
else
    echo "❌ Frontend: Error (Status: $FRONTEND_STATUS)"
fi
```

### **4. Monitoreo y Logs**

#### **Configurar Logs en EasyPanel**
```yaml
# easypanel.yml
services:
  frontend:
    logs:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
  
  backend:
    logs:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

#### **Comandos Útiles para Debugging**
```bash
# Ver logs en EasyPanel
easypanel logs curetcore-frontend --tail 100
easypanel logs curetcore-backend --tail 100

# Entrar al contenedor
easypanel exec curetcore-backend sh

# Ver métricas
easypanel stats curetcore
```

## 📱 Guía de Uso Post-Deploy

### **1. Primer Login**
```typescript
// Credenciales iniciales
Email: admin@curetcore.com
Password: CuretAdmin2024!

// Cambiar inmediatamente después del primer login
```

### **2. Verificar Conexión a Datos**
1. Ir a https://core.curetcore.com
2. Login con credenciales
3. Dashboard debe mostrar:
   - Ventas del día actual
   - Órdenes totales
   - Ticket promedio
   - Top 5 productos

### **3. Troubleshooting Común**

#### **Error: No se muestran datos**
```sql
-- Verificar en PostgreSQL
SELECT COUNT(*) FROM shopify_orders WHERE DATE(created_at) = CURRENT_DATE;

-- Si no hay datos de hoy, verificar días anteriores
SELECT DATE(created_at), COUNT(*) 
FROM shopify_orders 
GROUP BY DATE(created_at) 
ORDER BY DATE(created_at) DESC 
LIMIT 7;
```

#### **Error: Cannot connect to database**
```bash
# Verificar conexión desde EasyPanel
psql postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse

# Verificar desde el contenedor
docker exec -it curetcore-backend sh
nc -zv panel.curetshop.com 5432
```

#### **Error: CORS issues**
```javascript
// Verificar en backend/src/server.ts
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://core.curetcore.com',
  credentials: true
}));
```

## 📊 Métricas de Performance Esperadas

### **Fase 1 - Objetivos**
- **Time to First Byte (TTFB)**: < 200ms
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Total Bundle Size**: < 300KB (gzipped)
- **API Response Time**: < 100ms (p95)
- **Uptime**: > 99.5%

### **Queries Optimizadas**
```sql
-- Query para ventas del día (debe ejecutar en <50ms)
EXPLAIN ANALYZE
SELECT 
    COUNT(DISTINCT id) as total_orders,
    SUM(total_price::decimal) as total_revenue,
    AVG(total_price::decimal) as avg_ticket
FROM shopify_orders
WHERE DATE(created_at) = CURRENT_DATE
    AND financial_status = 'paid';
```

---

**Siguiente Paso**: Una vez completada esta fase, tendremos una base sólida para agregar más módulos y funcionalidades según el roadmap completo.