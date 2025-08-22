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
-- Password hash generado con bcrypt
INSERT INTO curetcore.users (email, password_hash, first_name, last_name, role)
VALUES (
    'admin@curetcore.com',
    '$2a$10$cGb3uj6MCxi6bFkw3zlVRu0xmCwIOYsgzMYKNa8MqY573NI7YLC6C',
    'Admin',
    'CuretCore',
    'super_admin'
) ON CONFLICT (email) DO NOTHING;