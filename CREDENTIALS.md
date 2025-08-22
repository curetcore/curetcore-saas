# 🔐 CuretCore - Credenciales y Configuración

> ⚠️ **IMPORTANTE**: Este archivo contiene información sensible. 
> - NO commitear este archivo a Git
> - Mantener actualizado con cada cambio
> - Guardar copia segura en gestor de contraseñas

## 📊 Base de Datos PostgreSQL

### Conexión Principal (Data Warehouse)
```bash
Host: panel.curetshop.com
Port: 5432
Database: warehouse
Username: postgres
Password: Pitagora@
SSL: false

# Connection String
DATABASE_URL=postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse
```

### Esquema CuretCore
```sql
Schema: curetcore
-- Creado específicamente para este proyecto
```

## 🌐 Dominios y URLs

### Producción
```
Frontend: https://core.curetcore.com
API: https://api.curetcore.com
```

### Desarrollo
```
Frontend: http://localhost:3000
API: http://localhost:3001
```

## 🔑 Autenticación JWT

### Secrets (Generar antes de producción)
```bash
# Generar con: openssl rand -base64 32
JWT_SECRET=
JWT_REFRESH_SECRET=

# Tiempos de expiración
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## 👤 Usuarios del Sistema

### Super Admin (Inicial)
```
Email: admin@curetcore.com
Password: CuretAdmin2024!
Role: super_admin
Nota: Cambiar en el primer login
```

### Usuarios de Prueba
```
# Admin
Email: admin.test@curetcore.com
Password: TestAdmin123!
Role: admin

# Manager
Email: manager.test@curetcore.com
Password: TestManager123!
Role: manager

# Viewer
Email: viewer.test@curetcore.com
Password: TestViewer123!
Role: viewer
```

## 🚀 EasyPanel

### Acceso al Panel
```
URL: https://panel.curetshop.com
Username: [tu-usuario]
Password: [tu-password]
```

### Configuración de la App
```
App Name: curetcore
Git Repository: https://github.com/curetcore/curetcore-saas.git
Branch: main
```

### Variables de Entorno en EasyPanel
```bash
# Frontend
NEXT_PUBLIC_API_URL=https://api.curetcore.com
NEXT_PUBLIC_APP_NAME=CuretCore
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_COMPANY_NAME=Curetshop
NEXT_PUBLIC_REFRESH_INTERVAL=300000

# Backend
DATABASE_URL=postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse
JWT_SECRET=[GENERAR]
JWT_REFRESH_SECRET=[GENERAR]
NODE_ENV=production
CORS_ORIGIN=https://core.curetcore.com
REDIS_URL=redis://redis:6379
```

## 🐙 GitHub

### Repositorio
```
URL: https://github.com/curetcore/curetcore-saas.git
Visibility: Private
```

### Personal Access Token (para CI/CD)
```
Token: ghp_[tu-token-aqui]
Scopes: repo, workflow, packages
```

## 🔄 Servicios de Terceros

### Redis (Local/Docker)
```
Host: localhost (dev) / redis (docker)
Port: 6379
Password: [ninguno en desarrollo]
```

### Airbyte (Data Source)
```
URL: [URL de tu instancia Airbyte]
Username: [si aplica]
Password: [si aplica]
```

### Sentry (Opcional - Monitoring)
```
DSN Frontend: 
DSN Backend: 
Organization: curetshop
Project: curetcore
```

### Google Analytics (Opcional)
```
Measurement ID: G-XXXXXXXXXX
```

## 🔒 SSL/TLS

### Let's Encrypt (Auto en EasyPanel)
```
Domains:
- core.curetcore.com
- api.curetcore.com

Auto-renewal: Enabled
```

## 📧 Email Service (Futuro)

### Resend.com
```
API Key: re_[tu-api-key]
From Email: noreply@curetcore.com
```

## 🗄️ Backups

### S3 Bucket (o alternativa)
```
Bucket: curetcore-backups
Region: us-east-1
Access Key: 
Secret Key: 
```

## 🛠️ Comandos Útiles

### Generar Passwords Seguros
```bash
# Password aleatorio
openssl rand -base64 16

# JWT Secret
openssl rand -base64 32

# Hash password con bcrypt (Node.js)
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('password', 10).then(console.log)"
```

### Conectar a PostgreSQL
```bash
# Desde terminal
psql postgresql://postgres:Pitagora@@panel.curetshop.com:5432/warehouse

# Verificar conexión
psql -h panel.curetshop.com -p 5432 -U postgres -d warehouse -c "SELECT NOW();"
```

## 📝 Notas de Seguridad

1. **Rotación de Credenciales**
   - JWT Secrets: Cada 6 meses
   - Passwords de usuarios: Cada 3 meses
   - Database passwords: Anualmente

2. **Respaldos**
   - Este archivo: Gestor de contraseñas + backup encriptado
   - Database: Backup diario automático
   - Código: GitHub (privado)

3. **Acceso**
   - 2FA habilitado en todas las cuentas críticas
   - Principio de menor privilegio
   - Logs de auditoría activos

---

**Última actualización**: [Fecha]
**Actualizado por**: [Usuario]