# 🌟 CuretCore v2 - Visión General del Proyecto

## 📋 Resumen Ejecutivo

**CuretCore v2** es una plataforma SaaS de Business Intelligence diseñada para centralizar, analizar y visualizar todos los datos operativos de Curetshop en tiempo real. Construida sobre las lecciones aprendidas del v1, esta versión elimina dependencias externas (Firebase) y adopta una arquitectura moderna, escalable y completamente controlada.

**Misión**: Proporcionar una torre de control integral que permita tomar decisiones basadas en datos, automatizar procesos y optimizar las operaciones del negocio.

## 🎯 Objetivos Principales

1. **Centralización de Datos**
   - Único punto de verdad en PostgreSQL
   - Integración automática vía Airbyte
   - Datos en tiempo real de todas las fuentes

2. **Inteligencia de Negocio**
   - Análisis predictivo
   - Alertas inteligentes
   - Recomendaciones automatizadas
   - Reportes personalizados

3. **Experiencia de Usuario Superior**
   - Dashboard personalizable
   - Acceso móvil completo
   - Actualizaciones en tiempo real
   - Interfaz intuitiva

4. **Arquitectura SaaS-Ready**
   - Multi-tenant desde el diseño
   - API-first approach
   - Escalabilidad horizontal
   - Deployment en EasyPanel

## 🏗️ Arquitectura Completa

### **Stack Tecnológico Final**

```yaml
Frontend:
  Core:
    - Next.js 14 (App Router)
    - TypeScript + Zod
    - Tailwind CSS + shadcn/ui
  
  Estado y Datos:
    - TanStack Query (server state)
    - Zustand (client state)
    - React Hook Form
    
  Visualización:
    - Recharts (gráficos)
    - Tremor (dashboards)
    - Framer Motion (animaciones)
    
  Real-time:
    - Socket.io client
    - Server-Sent Events

Backend:
  Core:
    - Node.js + Fastify
    - TypeScript
    - PostgreSQL + Prisma ORM
    
  Servicios:
    - Redis (cache + sessions)
    - BullMQ (job queues)
    - WebSockets (real-time)
    
  Integraciones:
    - Airbyte (ETL)
    - N8N (automatizaciones)
    - Resend (emails)
    - S3 (archivos)

Infraestructura:
  - Docker + Docker Compose
  - EasyPanel (hosting)
  - GitHub Actions (CI/CD)
  - Sentry (monitoring)
  - Grafana + Prometheus (metrics)
```

### **Arquitectura de Microservicios**

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                          │
└─────────────────┬─────────────────────────┬─────────────────┘
                  │                         │
         ┌────────▼────────┐       ┌───────▼────────┐
         │   Web App       │       │   API Gateway  │
         │  (Next.js)      │       │   (Fastify)    │
         └────────┬────────┘       └───────┬────────┘
                  │                         │
                  └────────────┬────────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
       ┌────────▼────┐ ┌──────▼─────┐ ┌─────▼──────┐
       │   Auth      │ │  Business  │ │ Analytics  │
       │  Service    │ │   Logic    │ │  Service   │
       └─────────────┘ └────────────┘ └────────────┘
                │              │              │
                └──────────────┼──────────────┘
                               │
                    ┌──────────▼──────────┐
                    │    PostgreSQL       │
                    │  (Data Warehouse)    │
                    └─────────────────────┘
```

## 📊 Módulos del Sistema

### **1. Torre de Control Principal**
- Dashboard ejecutivo personalizable
- Métricas en tiempo real
- Alertas y notificaciones
- Vista 360° del negocio

### **2. Módulo de Ventas**
- Análisis de ventas multi-canal
- Tracking de metas y comisiones
- Análisis de productos y categorías
- Predicción de demanda
- Gestión de devoluciones

### **3. Módulo de Inventarios**
- Control multi-ubicación
- Alertas de stock crítico
- Órdenes de reabastecimiento automáticas
- Análisis ABC de productos
- Predicción de roturas de stock

### **4. Módulo de Finanzas**
- Flujo de caja en tiempo real
- Control de gastos por categoría
- Análisis de rentabilidad
- Presupuestos y proyecciones
- Conciliación bancaria automática

### **5. Módulo de Marketing**
- ROI de campañas (Meta, Google)
- Análisis de audiencias
- A/B testing dashboard
- Attribution modeling
- Presupuesto publicitario optimizado

### **6. Módulo de Recursos Humanos**
- Gestión de empleados
- Control de asistencia
- Evaluación de desempeño
- Nómina y comisiones
- Capacitación y desarrollo

### **7. Módulo de Clientes**
- CRM integrado
- Análisis de comportamiento
- Segmentación automática
- Programa de lealtad
- Soporte y tickets

### **8. Módulo de Proveedores**
- Gestión de órdenes de compra
- Evaluación de proveedores
- Control de pagos
- Análisis de precios
- SLA monitoring

### **9. Centro de Inteligencia**
- Machine Learning models
- Predicciones y forecasting
- Recomendaciones automáticas
- Anomaly detection
- Business insights

### **10. Automatizaciones**
- Workflows personalizables
- Triggers basados en eventos
- Integraciones con N8N
- Notificaciones multi-canal
- Acciones programadas

## 🚀 Roadmap de Implementación

### **Fase 1: Foundation (Mes 1)**
- ✅ MVP con métricas básicas
- ✅ Autenticación y permisos
- ✅ Dashboard de ventas
- ✅ Deployment en EasyPanel

### **Fase 2: Core Business (Mes 2)**
- [ ] Módulo completo de ventas
- [ ] Módulo de inventarios
- [ ] Sistema de alertas
- [ ] Exportación de reportes

### **Fase 3: Financial Control (Mes 3)**
- [ ] Módulo de finanzas
- [ ] Integración bancaria
- [ ] Módulo de gastos
- [ ] Dashboard de ROI

### **Fase 4: Operations (Mes 4)**
- [ ] Módulo de RRHH
- [ ] Módulo de proveedores
- [ ] Automatizaciones básicas
- [ ] Mobile app (PWA)

### **Fase 5: Intelligence (Mes 5)**
- [ ] ML models básicos
- [ ] Predicciones
- [ ] Recomendaciones
- [ ] Análisis avanzado

### **Fase 6: Scale (Mes 6)**
- [ ] Multi-tenant completo
- [ ] API pública
- [ ] Marketplace de integraciones
- [ ] White-label ready

## 🔐 Sistema de Permisos (Mejorado del v1)

### **Roles Base**
```typescript
enum Role {
  SUPER_ADMIN = 'super_admin',    // Acceso total al sistema
  ADMIN = 'admin',                // Gestión completa de la empresa
  MANAGER = 'manager',            // Gestión de área específica
  SUPERVISOR = 'supervisor',      // Supervisión de equipo
  EMPLOYEE = 'employee',          // Acceso operativo
  VIEWER = 'viewer',              // Solo lectura
  CUSTOM = 'custom'               // Rol personalizado
}
```

### **Permisos Granulares**
```typescript
interface Permission {
  resource: string;      // 'sales', 'inventory', 'finance'
  action: string;        // 'create', 'read', 'update', 'delete'
  scope?: {             // Alcance del permiso
    own?: boolean;      // Solo sus propios datos
    team?: boolean;     // Datos de su equipo
    location?: string;  // Datos de ubicación específica
    timeRange?: string; // Rango de tiempo permitido
  };
}
```

## 🎨 Experiencia de Usuario

### **Principios de Diseño**
1. **Claridad**: Información presentada de forma clara y accionable
2. **Velocidad**: Respuesta instantánea, carga progresiva
3. **Consistencia**: Patrones de diseño uniformes
4. **Accesibilidad**: WCAG 2.1 AA compliance
5. **Personalización**: Dashboards adaptables a cada rol

### **Características de UX**
- Dark/Light mode con preferencia del sistema
- Diseño responsive mobile-first
- Atajos de teclado
- Tour guiado para nuevos usuarios
- Búsqueda global con comando K
- Notificaciones no intrusivas
- Estados de carga skeleton
- Animaciones suaves 60fps

## 🔄 Integraciones

### **Fuentes de Datos (vía Airbyte)**
- Shopify (ventas e-commerce)
- POS Systems (ventas físicas)
- Meta Ads (publicidad Facebook/Instagram)
- Google Ads (publicidad Google)
- Google Analytics (análisis web)
- Airtable (datos operativos)
- QuickBooks (contabilidad)
- Bancos (movimientos bancarios)

### **Servicios Externos**
- WhatsApp Business API (notificaciones)
- Resend (emails transaccionales)
- Twilio (SMS)
- S3/Cloudflare R2 (almacenamiento)
- OpenAI API (IA features)
- Google Maps (geolocalización)

### **Herramientas Internas**
- N8N (automatizaciones)
- Metabase (análisis ad-hoc)
- Grafana (monitoring)
- Sentry (error tracking)

## 🛡️ Seguridad y Compliance

### **Medidas de Seguridad**
- Encriptación end-to-end
- 2FA obligatorio para admins
- Audit logs completos
- Rate limiting por endpoint
- CORS y CSP configurados
- Backups automáticos diarios
- Disaster recovery plan
- Penetration testing regular

### **Compliance**
- GDPR ready
- PCI DSS para pagos
- SOC 2 Type II (futuro)
- ISO 27001 (futuro)

## 📈 Métricas de Éxito

### **KPIs Técnicos**
- Uptime: 99.9%
- Response time: <200ms p95
- Error rate: <0.1%
- Deployment frequency: Daily
- MTTR: <30 minutos

### **KPIs de Negocio**
- Adopción: 100% empleados activos
- Engagement: 5+ sesiones/día promedio
- Valor: 20% mejora en toma de decisiones
- ROI: 300% en 12 meses
- NPS: >80

## 💰 Modelo de Monetización (Futuro)

### **SaaS Tiers**
1. **Starter**: $99/mes
   - 5 usuarios
   - Módulos básicos
   - 30 días histórico

2. **Professional**: $299/mes
   - 20 usuarios
   - Todos los módulos
   - 1 año histórico
   - API access

3. **Enterprise**: Custom
   - Usuarios ilimitados
   - White label
   - SLA garantizado
   - Soporte dedicado

## 🎯 Visión a Largo Plazo

### **Año 1**: Foundation
- Sistema completo funcionando
- 100% adopción interna
- ROI demostrado

### **Año 2**: Expansion
- Multi-empresa
- Marketplace de apps
- API ecosystem

### **Año 3**: Platform
- SaaS público
- 1000+ clientes
- $1M ARR

### **Año 5**: Leader
- Líder en retail analytics LATAM
- 10,000+ clientes
- $10M ARR
- Expansión internacional

## 🤝 Equipo y Recursos

### **Equipo Core**
- 1 Product Owner
- 2 Full-stack developers
- 1 Data engineer
- 1 UI/UX designer
- 1 DevOps engineer

### **Recursos Necesarios**
- Servidor en EasyPanel (escalable)
- PostgreSQL managed
- Redis Cloud
- Dominio y SSL
- Servicios de terceros

## 🔧 Especificaciones Técnicas Detalladas

### **1. Estructura de Base de Datos**
```sql
-- Esquema principal para datos de negocio
CREATE SCHEMA IF NOT EXISTS curetcore;

-- Tablas de usuarios y autenticación
CREATE TABLE curetcore.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tablas de sesiones
CREATE TABLE curetcore.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES curetcore.users(id),
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tablas de permisos personalizados
CREATE TABLE curetcore.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES curetcore.users(id),
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    scope JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, resource, action)
);

-- Audit logs
CREATE TABLE curetcore.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES curetcore.users(id),
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100),
    resource_id VARCHAR(100),
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_users_email ON curetcore.users(email);
CREATE INDEX idx_sessions_token ON curetcore.sessions(token_hash);
CREATE INDEX idx_sessions_expires ON curetcore.sessions(expires_at);
CREATE INDEX idx_audit_logs_user ON curetcore.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON curetcore.audit_logs(created_at);
```

### **2. API Specification (OpenAPI 3.0)**
```yaml
openapi: 3.0.0
info:
  title: CuretCore API
  version: 2.0.0
  description: Business Intelligence Platform API

servers:
  - url: https://api.curetcore.com/v1
    description: Production server

paths:
  /auth/login:
    post:
      summary: User login
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  minLength: 8
      responses:
        200:
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  user:
                    $ref: '#/components/schemas/User'
                  accessToken:
                    type: string
                  refreshToken:
                    type: string

  /sales/metrics:
    get:
      summary: Get sales metrics
      security:
        - bearerAuth: []
      parameters:
        - name: startDate
          in: query
          schema:
            type: string
            format: date
        - name: endDate
          in: query
          schema:
            type: string
            format: date
        - name: groupBy
          in: query
          schema:
            type: string
            enum: [day, week, month]
      responses:
        200:
          description: Sales metrics
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SalesMetrics'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
        firstName:
          type: string
        lastName:
          type: string
        role:
          type: string
        createdAt:
          type: string
          format: date-time

    SalesMetrics:
      type: object
      properties:
        totalRevenue:
          type: number
        totalOrders:
          type: integer
        averageTicket:
          type: number
        topProducts:
          type: array
          items:
            type: object
            properties:
              productName:
                type: string
              revenue:
                type: number
              quantity:
                type: integer

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

### **3. Configuración de EasyPanel Detallada**

#### **easypanel.json**
```json
{
  "name": "curetcore",
  "services": [
    {
      "name": "frontend",
      "type": "app",
      "image": "ghcr.io/curetshop/curetcore-frontend:latest",
      "domains": [
        {
          "host": "core.curetcore.com",
          "https": true,
          "port": 3000
        }
      ],
      "env": {
        "NEXT_PUBLIC_API_URL": "https://api.curetcore.com",
        "NEXT_PUBLIC_APP_NAME": "CuretCore",
        "NEXT_PUBLIC_APP_VERSION": "2.0.0"
      },
      "deploy": {
        "replicas": 2,
        "strategy": "RollingUpdate",
        "resources": {
          "cpus": "0.5",
          "memory": "512M"
        }
      }
    },
    {
      "name": "backend",
      "type": "app",
      "image": "ghcr.io/curetshop/curetcore-backend:latest",
      "domains": [
        {
          "host": "api.curetcore.com",
          "https": true,
          "port": 3001
        }
      ],
      "env": {
        "NODE_ENV": "production",
        "DATABASE_URL": "{{secrets.DATABASE_URL}}",
        "JWT_SECRET": "{{secrets.JWT_SECRET}}",
        "REDIS_URL": "redis://redis:6379"
      },
      "deploy": {
        "replicas": 2,
        "strategy": "RollingUpdate",
        "resources": {
          "cpus": "1",
          "memory": "1G"
        }
      },
      "healthcheck": {
        "path": "/health",
        "interval": 30,
        "timeout": 10
      }
    },
    {
      "name": "redis",
      "type": "redis",
      "version": "7",
      "deploy": {
        "resources": {
          "cpus": "0.5",
          "memory": "512M"
        }
      },
      "volumes": [
        {
          "name": "redis-data",
          "path": "/data",
          "size": "5Gi"
        }
      ]
    }
  ],
  "secrets": [
    "DATABASE_URL",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET"
  ]
}
```

### **4. CI/CD Pipeline (GitHub Actions)**
```yaml
# .github/workflows/deploy.yml
name: Deploy to EasyPanel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          npm ci --prefix frontend
          npm ci --prefix backend
      
      - name: Run tests
        run: |
          npm run test --prefix frontend
          npm run test --prefix backend
      
      - name: Run linting
        run: |
          npm run lint --prefix frontend
          npm run lint --prefix backend

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push Frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-frontend:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-frontend:${{ github.sha }}
      
      - name: Build and push Backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-backend:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-backend:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to EasyPanel
        uses: curlimages/curl@v1
        with:
          args: |
            -X POST 
            -H "Authorization: Bearer ${{ secrets.EASYPANEL_TOKEN }}"
            -H "Content-Type: application/json"
            -d '{"service": "curetcore", "image": "latest"}'
            https://panel.curetshop.com/api/v1/apps/curetcore/deploy
```

### **5. Monitoring Stack**
```yaml
# monitoring/docker-compose.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yaml:/etc/loki/local-config.yaml
      - loki_data:/loki

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log
      - ./promtail-config.yaml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml

volumes:
  prometheus_data:
  grafana_data:
  loki_data:
```

### **6. Backup Strategy**
```bash
#!/bin/bash
# backup.sh - Ejecutar diariamente via cron

# Variables
BACKUP_DIR="/backups/curetcore"
DATE=$(date +%Y%m%d_%H%M%S)
S3_BUCKET="s3://curetcore-backups"

# Crear directorio de backup
mkdir -p $BACKUP_DIR/$DATE

# Backup de base de datos
echo "Backing up PostgreSQL..."
PGPASSWORD=$DB_PASSWORD pg_dump \
  -h panel.curetshop.com \
  -U postgres \
  -d warehouse \
  --schema=curetcore \
  -f $BACKUP_DIR/$DATE/curetcore_db.sql

# Backup de Redis
echo "Backing up Redis..."
docker exec curetcore-redis redis-cli BGSAVE
docker cp curetcore-redis:/data/dump.rdb $BACKUP_DIR/$DATE/redis_dump.rdb

# Comprimir backups
tar -czf $BACKUP_DIR/curetcore_backup_$DATE.tar.gz -C $BACKUP_DIR $DATE

# Subir a S3 (o storage preferido)
aws s3 cp $BACKUP_DIR/curetcore_backup_$DATE.tar.gz $S3_BUCKET/

# Limpiar backups locales antiguos (mantener últimos 7 días)
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: curetcore_backup_$DATE.tar.gz"
```

## 📚 Documentación

### **Para Desarrolladores**
- API documentation (OpenAPI)
- Database schema
- Architecture decisions
- Coding standards
- Git workflow

### **Para Usuarios**
- User guides
- Video tutorials
- Knowledge base
- FAQ section
- Change logs

## 🎉 Conclusión

CuretCore v2 representa la evolución natural del sistema v1, manteniendo sus mejores características mientras elimina sus limitaciones. Con una arquitectura moderna, escalable y completamente bajo nuestro control, está preparado para crecer junto con el negocio y eventualmente convertirse en una plataforma SaaS líder en el mercado.

---

**"De una torre de control interna a la plataforma de Business Intelligence líder para retail en LATAM"**