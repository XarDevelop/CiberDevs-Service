# Etapa 1: Build y compilación (Dependencias de desarrollo incluidas)
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar archivos de definición de paquetes
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para poder compilar TypeScript)
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa 2: Producción (Imagen ligera, solo dependencias necesarias y código compilado)
FROM node:20-alpine

WORKDIR /usr/src/app

# Variables de entorno por defecto (pueden sobrescribirse)
ENV NODE_ENV=production

# Copiar configuración de dependencias
COPY package*.json ./

# Instalar SOLO dependencias de producción (más seguro y ligero)
RUN npm ci --only=production

# Copiar el código compilado desde la etapa anterior
COPY --from=builder /usr/src/app/dist ./dist
# Copiar las migraciones
COPY --from=builder /usr/src/app/migration ./migration

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
