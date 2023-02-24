# Imagem base do Node.js
FROM node:19.2.0

# Define o diretório de trabalho da aplicação
WORKDIR /app

# Copia os arquivos necessários para a aplicação
COPY package*.json ./
COPY ./app ./app

# Instala as dependências da aplicação
RUN npm install

# Inicia a aplicação
CMD ["npm", "run", "start:docker"]
