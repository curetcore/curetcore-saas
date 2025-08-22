# 🗄️ Configuración de Base de Datos - CuretCore

## Estado Actual

- ✅ Scripts SQL creados
- ✅ Usuario admin con contraseña hasheada
- ⏳ Pendiente: Ejecutar en el servidor PostgreSQL

## Información de Conexión

```
Host: 147.93.177.156
Puerto: 5432
Base de datos: warehouse
Usuario: postgres
Contraseña: Pitagora@
Connection String: postgresql://postgres:Pitagora@@147.93.177.156:5432/warehouse?sslmode=disable
```

## Pasos para Ejecutar

### Opción 1: Desde el Servidor (SSH)

Si tienes acceso SSH al servidor donde está PostgreSQL:

```bash
# 1. Conectar por SSH
ssh usuario@servidor

# 2. Crear archivo temporal con el script
cat > /tmp/init-curetcore.sql << 'EOF'
-- Crear esquema si no existe
CREATE SCHEMA IF NOT EXISTS curetcore;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS curetcore.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'manager', 'supervisor', 'employee', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Crear índices
CREATE INDEX idx_users_email ON curetcore.users(email);
CREATE INDEX idx_users_role ON curetcore.users(role);
CREATE INDEX idx_users_is_active ON curetcore.users(is_active);

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION curetcore.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE
    ON curetcore.users FOR EACH ROW
    EXECUTE FUNCTION curetcore.update_updated_at_column();

-- Insertar usuario admin inicial (password: CuretAdmin2024!)
INSERT INTO curetcore.users (email, password_hash, first_name, last_name, role)
VALUES (
    'admin@curetcore.com',
    '$2a$10$cGb3uj6MCxi6bFkw3zlVRu0xmCwIOYsgzMYKNa8MqY573NI7YLC6C',
    'Admin',
    'CuretCore',
    'super_admin'
) ON CONFLICT (email) DO NOTHING;
EOF

# 3. Ejecutar el script
psql -h localhost -U postgres -d warehouse -f /tmp/init-curetcore.sql

# 4. Verificar
psql -h localhost -U postgres -d warehouse -c "SELECT * FROM curetcore.users;"
```

### Opción 2: Usando un Cliente SQL (DBeaver, pgAdmin, TablePlus)

1. Crear nueva conexión con los datos proporcionados
2. Copiar y ejecutar el contenido de `backend/scripts/init-database.sql`
3. Verificar que se haya creado el usuario admin

### Opción 3: Túnel SSH + Ejecución Local

Si tienes acceso SSH pero no directo a PostgreSQL:

```bash
# 1. Crear túnel SSH (en una terminal)
ssh -L 5432:localhost:5432 usuario@147.93.177.156

# 2. En otra terminal, ejecutar el script
cd ~/Desktop/curetcore/backend/scripts
PGPASSWORD='Pitagora@' psql -h localhost -p 5432 -U postgres -d warehouse -f init-database.sql
```

## Verificación Post-Instalación

Ejecuta estas consultas para verificar que todo esté correcto:

```sql
-- Verificar esquema
SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'curetcore';

-- Verificar tabla
SELECT table_name FROM information_schema.tables WHERE table_schema = 'curetcore';

-- Verificar usuario admin
SELECT email, role, is_active FROM curetcore.users WHERE email = 'admin@curetcore.com';
```

## Resultado Esperado

Después de ejecutar el script deberías ver:

```
CREATE SCHEMA
CREATE TABLE
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE FUNCTION
CREATE TRIGGER
INSERT 0 1
```

## Troubleshooting

### "Connection timed out"
- La base de datos no acepta conexiones desde tu IP
- Solución: Usar SSH o ejecutar desde el servidor

### "FATAL: password authentication failed"
- Contraseña incorrecta
- Verificar que uses: `Pitagora@`

### "ERROR: permission denied for schema curetcore"
- El usuario no tiene permisos suficientes
- Ejecutar con usuario postgres o solicitar permisos

## Próximos Pasos

Una vez configurada la base de datos:

1. **Probar el backend localmente** (si tienes acceso por túnel SSH)
2. **Configurar variables de entorno** en producción
3. **Desplegar la aplicación** en EasyPanel

## Usuario de Prueba

```
Email: admin@curetcore.com
Contraseña: CuretAdmin2024!
Rol: super_admin
```

⚠️ **IMPORTANTE**: Cambiar esta contraseña en el primer login en producción.