FROM node:20.0.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/ultra-hotels /usr/share/nginx/html

EXPOSE 80
