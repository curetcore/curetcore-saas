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
