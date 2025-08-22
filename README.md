# CuretCore SaaS

> Business Intelligence Platform - Centralizing all business data for smarter decisions

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

## 🎯 Overview

CuretCore v2 is a complete rewrite of our business intelligence platform, designed to centralize all operational data from multiple sources (Shopify, Meta Ads, Airtable, etc.) into a single, powerful dashboard.

### Key Features
- 📊 Real-time sales metrics and analytics
- 📦 Multi-location inventory management
- 💰 Financial control and expense tracking
- 👥 Employee performance monitoring
- 🤖 AI-powered insights and predictions
- 🔄 Automated workflows with N8N
- 📱 Mobile-responsive design
- 🔐 Role-based access control

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

- [MVP Phase 1](./docs/FASE_1_MVP.md) - First functional phase (3-4 days)
- [General Vision](./docs/VISION_GENERAL.md) - Complete project roadmap
- [Implementation Checklist](./docs/IMPLEMENTATION_CHECKLIST.md) - Step-by-step guide

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express/Fastify, PostgreSQL, Redis
- **Deployment**: Docker, EasyPanel

## 🏗️ Project Structure

```
curetcore/
├── frontend/          # Next.js application
├── backend/           # Node.js API server
├── docs/              # Project documentation
├── nginx/             # Nginx configuration
├── scripts/           # Utility scripts
└── docker-compose.yml # Docker development setup
```

## 🔒 Security

- JWT-based authentication (no Firebase dependency)
- Role-based access control (5 levels)
- All sensitive data encrypted
- Regular security audits
- Automated backups

## 📈 Current Status

- [x] Project structure created
- [x] Documentation complete
- [x] GitHub repository configured
- [ ] MVP Phase 1 development
- [ ] EasyPanel deployment
- [ ] Production launch

## 👥 Team

- **Project Lead**: @ronaldopaulino
- **Development**: CuretCore Team

## 📝 License

Private - Curetshop © 2024

---

For credentials and sensitive information, see `CREDENTIALS.md` (not tracked in Git)
