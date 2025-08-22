-- Script para verificar el estado de la base de datos CuretCore

-- Verificar si el esquema existe
SELECT 'Esquema curetcore' as item, 
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'curetcore')
            THEN '✓ Existe'
            ELSE '✗ No existe'
       END as estado;

-- Verificar tablas
SELECT 'Tabla users' as item,
       CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables 
                        WHERE table_schema = 'curetcore' AND table_name = 'users')
            THEN '✓ Existe'
            ELSE '✗ No existe'
       END as estado;

-- Contar usuarios
SELECT 'Usuarios totales' as item, 
       COALESCE(COUNT(*)::text, '0') as estado
FROM curetcore.users;

-- Verificar usuario admin
SELECT 'Usuario admin@curetcore.com' as item,
       CASE WHEN EXISTS (SELECT 1 FROM curetcore.users WHERE email = 'admin@curetcore.com')
            THEN '✓ Existe'
            ELSE '✗ No existe'
       END as estado;

-- Mostrar estructura de la tabla users si existe
\d curetcore.users