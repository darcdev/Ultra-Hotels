FROM node:20.11.1-alpine as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/ultra-hotels /usr/share/nginx/html
