# Étape 1 : Construire l'application Angular
FROM node:20 as builder

WORKDIR /src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build 

# Étape 2 : Exécuter l'application Angular dans un serveur HTTP léger
FROM nginx:alpine

# Ensure the path matches the output directory of your Angular build
COPY --from=builder dist/frontend /usr/share/nginx/html
EXPOSE 80