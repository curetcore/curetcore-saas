#!/bin/bash

# Script de inicialización para CuretCore SaaS
# Este script configura la estructura inicial del proyecto y lo conecta con GitHub

echo "🚀 Inicializando CuretCore SaaS..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "FASE_1_MVP.md" ]; then
    echo "❌ Error: Ejecuta este script desde el directorio /Desktop/curetcore"
    exit 1
fi

# Crear estructura de directorios
echo -e "${BLUE}📁 Creando estructura de directorios...${NC}"
mkdir -p frontend/{src/{app,components,hooks,lib,services},public}
mkdir -p backend/{src/{config,middleware,routes,services,types},scripts}
mkdir -p nginx/ssl
mkdir -p scripts
mkdir -p docs

# Crear archivos base
echo -e "${BLUE}📄 Creando archivos de configuración...${NC}"

# Git ignore principal
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Production
build/
dist/
.next/
out/

# Misc
.DS_Store
*.pem
.vscode/
.idea/

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local env files
.env
.env.local
.env.production.local
.env.development.local
.env.test.local

# Certificates
*.pem
*.key
*.crt

# Docker
*.log
EOF

# README principal
cat > README.md << 'EOF'
# CuretCore SaaS

Business Intelligence Platform for Curetshop

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL access
- Redis

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/curetcore/curetcore-saas.git
cd curetcore-saas
```

2. Install dependencies:
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

3. Configure environment variables:
```bash
# Copy example files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

4. Start development servers:
```bash
# Using Docker Compose
docker-compose up -d

# Or manually
cd frontend && npm run dev
cd backend && npm run dev
```

## 📚 Documentation

- [MVP Phase 1](./FASE_1_MVP.md)
- [General Vision](./VISION_GENERAL.md)
- [Implementation Checklist](./IMPLEMENTATION_CHECKLIST.md)

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express/Fastify, PostgreSQL, Redis
- **Deployment**: Docker, EasyPanel

## 📝 License

Private - Curetshop © 2024
EOF

# Docker Compose para desarrollo
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: curetcore-frontend-dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: curetcore-backend-dev
    ports:
      - "3001:3001"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    container_name: curetcore-redis-dev
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
EOF

# Mover documentación existente
echo -e "${BLUE}📚 Organizando documentación...${NC}"
cp FASE_1_MVP.md docs/
cp VISION_GENERAL.md docs/
cp IMPLEMENTATION_CHECKLIST.md docs/

# Frontend package.json inicial
cat > frontend/package.json << 'EOF'
{
  "name": "curetcore-frontend",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
EOF

# Backend package.json inicial
cat > backend/package.json << 'EOF'
{
  "name": "curetcore-backend",
  "version": "2.0.0",
  "private": true,
  "main": "dist/server.js",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src --ext .ts",
    "type-check": "tsc --noEmit"
  }
}
EOF

# Environment examples
cat > frontend/.env.example << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=CuretCore
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_COMPANY_NAME=Curetshop

# Features
NEXT_PUBLIC_REFRESH_INTERVAL=300000
EOF

cat > backend/.env.example << 'EOF'
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@host:port/dbname
DATABASE_SSL=false

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
EOF

# Inicializar Git y conectar con GitHub
echo -e "${BLUE}🔗 Configurando Git...${NC}"
git init
git add .
git commit -m "Initial commit: Project structure and documentation"

# Conectar con el repositorio remoto
git remote add origin https://github.com/curetcore/curetcore-saas.git
git branch -M main

echo -e "${GREEN}✅ Proyecto inicializado correctamente!${NC}"
echo ""
echo "Próximos pasos:"
echo "1. Revisa y ajusta las variables de entorno en los archivos .env"
echo "2. Ejecuta: git push -u origin main"
echo "3. Sigue las instrucciones en docs/IMPLEMENTATION_CHECKLIST.md"
echo ""
echo "Para comenzar el desarrollo:"
echo "  cd frontend && npm install"
echo "  cd ../backend && npm install"
echo ""
echo "¡Listo para construir CuretCore v2! 🚀"
EOF

# Hacer el script ejecutable
chmod +x init-project.sh