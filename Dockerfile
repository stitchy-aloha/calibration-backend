FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

COPY . .

EXPOSE 3000

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "start:dev"]
