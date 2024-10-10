# Utiliza una imagen oficial de Node.js con soporte para TypeScript
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto en el que corre la aplicación (el mismo que en tu código)
EXPOSE 3000

# Comando para compilar y correr la aplicación
CMD ["npm", "run", "dev"]
