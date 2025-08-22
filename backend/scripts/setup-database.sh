#!/bin/bash

# Script para configurar la base de datos CuretCore
# Uso: ./setup-database.sh <host> <port> <database> <username>

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar argumentos
if [ "$#" -lt 4 ]; then
    echo -e "${RED}Error: Faltan argumentos${NC}"
    echo "Uso: $0 <host> <port> <database> <username>"
    echo "Ejemplo: $0 localhost 5432 warehouse postgres"
    exit 1
fi

HOST=$1
PORT=$2
DATABASE=$3
USERNAME=$4

echo -e "${BLUE}=== Configuración de Base de Datos CuretCore ===${NC}"
echo -e "Host: $HOST"
echo -e "Puerto: $PORT"
echo -e "Base de datos: $DATABASE"
echo -e "Usuario: $USERNAME"
echo ""

# Solicitar contraseña
echo -n "Ingrese la contraseña para $USERNAME: "
read -s PASSWORD
echo ""

# Exportar contraseña para psql
export PGPASSWORD=$PASSWORD

# Verificar conexión
echo -e "${BLUE}Verificando conexión...${NC}"
if psql -h $HOST -p $PORT -U $USERNAME -d $DATABASE -c "SELECT version();" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Conexión exitosa${NC}"
else
    echo -e "${RED}✗ Error de conexión. Verifique los datos.${NC}"
    exit 1
fi

# Ejecutar script SQL
echo -e "${BLUE}Ejecutando script de inicialización...${NC}"
if psql -h $HOST -p $PORT -U $USERNAME -d $DATABASE -f init-database.sql; then
    echo -e "${GREEN}✓ Script ejecutado exitosamente${NC}"
else
    echo -e "${RED}✗ Error al ejecutar el script${NC}"
    exit 1
fi

# Verificar creación de tablas
echo -e "${BLUE}Verificando tablas creadas...${NC}"
TABLES=$(psql -h $HOST -p $PORT -U $USERNAME -d $DATABASE -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'curetcore';")

if [ -z "$TABLES" ]; then
    echo -e "${RED}✗ No se encontraron tablas en el esquema curetcore${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Tablas encontradas:${NC}"
    echo "$TABLES"
fi

# Verificar usuario admin
echo -e "${BLUE}Verificando usuario admin...${NC}"
ADMIN_EXISTS=$(psql -h $HOST -p $PORT -U $USERNAME -d $DATABASE -t -c "SELECT email FROM curetcore.users WHERE email = 'admin@curetcore.com';")

if [ -z "$ADMIN_EXISTS" ]; then
    echo -e "${RED}✗ Usuario admin no encontrado${NC}"
else
    echo -e "${GREEN}✓ Usuario admin creado: admin@curetcore.com${NC}"
fi

# Limpiar variable de entorno
unset PGPASSWORD

echo ""
echo -e "${GREEN}=== Configuración completada ===${NC}"
echo -e "Puede iniciar sesión con:"
echo -e "Email: admin@curetcore.com"
echo -e "Contraseña: CuretAdmin2024!"
echo ""
echo -e "${BLUE}Nota: Cambie la contraseña del admin en el primer login${NC}"