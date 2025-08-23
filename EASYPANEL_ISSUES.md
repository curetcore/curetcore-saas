# 🔧 EasyPanel SIGTERM Issues - Troubleshooting Guide

## Problema
Ambos servicios (frontend y backend) están recibiendo SIGTERM después de iniciar correctamente.

## Síntomas
- Frontend: Inicia en puerto 3000, luego recibe SIGTERM
- Backend: Inicia en puerto 80, luego recibe SIGTERM
- Los logs muestran que los servicios inician correctamente antes de terminar

## Posibles Causas en EasyPanel

### 1. Health Check Fallando
EasyPanel puede estar esperando un health check en una ruta específica.

**Solución**: 
- Frontend: Next.js tiene `/api/health` por defecto
- Backend: Ya tenemos `/health` endpoint

### 2. Puerto Incorrecto
EasyPanel puede esperar un puerto específico.

**Verificar en EasyPanel**:
- ¿El puerto configurado coincide con el que usa la app?
- Frontend generalmente usa 3000
- Backend está usando 80

### 3. Configuración de Proceso
El proceso puede no estar configurado correctamente en EasyPanel.

**Verificar**:
- Proceso principal debe ser "web"
- Comando debe coincidir con Procfile

### 4. Timeout de Inicio
La app puede estar tardando demasiado en estar "ready".

**Posibles soluciones**:
- Aumentar timeout en EasyPanel
- Optimizar tiempo de inicio

## Acciones Recomendadas

1. **En EasyPanel - Frontend**:
   - Verificar que el puerto esté configurado como 3000
   - Verificar health check endpoint
   - Revisar logs completos

2. **En EasyPanel - Backend**:
   - Cambiar puerto de 80 a 3001 (más estándar)
   - Verificar que DATABASE_URL esté correcta
   - Verificar timeouts

3. **Configuración Alternativa**:
   Si Buildpack sigue fallando, considerar:
   - Volver a Dockerfile
   - Usar Nixpack
   - Configurar un proceso supervisor

## Variables de Entorno Críticas

### Frontend
```
PORT=3000
NODE_ENV=production
```

### Backend  
```
PORT=3001
NODE_ENV=production
```

## Comandos de Debug

En EasyPanel console:
```bash
# Ver procesos
ps aux

# Ver puertos en uso
netstat -tlnp

# Ver variables de entorno
env

# Probar health check
curl http://localhost:3000/api/health
curl http://localhost:3001/health
```

---
Última actualización: 23 de Agosto, 2024