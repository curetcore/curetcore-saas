# Scripts de Base de Datos - CuretCore

Este directorio contiene los scripts necesarios para configurar la base de datos de CuretCore.

## Archivos

- `init-database.sql` - Script principal que crea el esquema, tablas y usuario inicial
- `setup-database.sh` - Script bash interactivo para ejecutar la configuración
- `verify-database.sql` - Script para verificar que todo se haya creado correctamente
- `generate-password-hash.js` - Utilidad para generar hashes de contraseñas

## Instrucciones de Configuración

### Opción 1: Usando el script bash (Recomendado)

```bash
cd backend/scripts
./setup-database.sh 147.93.177.156 5432 warehouse postgres
```

Cuando se solicite, ingrese la contraseña: `Pitagora@`

### Opción 2: Ejecución manual con psql

```bash
# Desde una máquina con acceso a la base de datos
PGPASSWORD='Pitagora@' psql -h 147.93.177.156 -p 5432 -U postgres -d warehouse -f init-database.sql
```

### Opción 3: Desde un cliente SQL (DBeaver, pgAdmin, etc.)

1. Conectarse a la base de datos con los siguientes datos:
   - Host: 147.93.177.156
   - Puerto: 5432
   - Base de datos: warehouse
   - Usuario: postgres
   - Contraseña: Pitagora@

2. Ejecutar el contenido del archivo `init-database.sql`

## Verificación

Después de ejecutar el script de inicialización, verifique que todo se haya creado correctamente:

```bash
PGPASSWORD='Pitagora@' psql -h 147.93.177.156 -p 5432 -U postgres -d warehouse -f verify-database.sql
```

## Credenciales del Usuario Inicial

- Email: `admin@curetcore.com`
- Contraseña: `CuretAdmin2024!`
- Rol: `super_admin`

**IMPORTANTE**: Cambie esta contraseña en el primer inicio de sesión.

## Solución de Problemas

### Error de conexión

Si no puede conectarse desde su máquina local, es posible que necesite:

1. **Acceso VPN** al servidor
2. **Túnel SSH**: 
   ```bash
   ssh -L 5432:localhost:5432 usuario@servidor
   ```
3. **Ejecutar desde el servidor**: Conectarse por SSH al servidor y ejecutar desde allí

### El esquema ya existe

El script está diseñado para ser idempotente. Si el esquema o las tablas ya existen, no se volverán a crear.

## Estructura de la Base de Datos

### Esquema: `curetcore`

### Tabla: `users`
- `id` (UUID) - Identificador único
- `email` (VARCHAR) - Email único del usuario
- `password_hash` (VARCHAR) - Contraseña hasheada con bcrypt
- `first_name` (VARCHAR) - Nombre
- `last_name` (VARCHAR) - Apellido
- `role` (VARCHAR) - Rol del usuario (super_admin, admin, manager, supervisor, employee, viewer)
- `created_at` (TIMESTAMP) - Fecha de creación
- `updated_at` (TIMESTAMP) - Última actualización
- `last_login` (TIMESTAMP) - Último inicio de sesión
- `is_active` (BOOLEAN) - Estado activo/inactivo