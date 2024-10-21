# Usa a versão mais recente do Node como base
FROM node:latest

# Cria um diretório de trabalho no container
WORKDIR /app

# Cria um usuário e grupo não-root
RUN groupadd -r appgroup && useradd -r -m -g appgroup appuser

# Copia os arquivos de dependências para o container e ajusta permissões
COPY package*.json ./

# Altera as permissões da pasta de trabalho para o novo usuário
RUN chown -R appuser:appgroup /app

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação para o container
COPY . .

# Altera as permissões de todo o diretório para o usuário não-root
RUN chown -R appuser:appgroup /app

# Muda para o usuário não-root
USER appuser

# Adiciona variável de ambiente para evitar erro de criptografia
ENV NODE_OPTIONS=--openssl-legacy-provider

# Compila a aplicação para produção com a flag openssl-legacy-provider
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# Expõe a porta 3000
EXPOSE 3000

# Inicia a aplicação com o usuário não-root
CMD ["npm", "start"]