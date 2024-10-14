# Stage 1: Build the application
FROM node:20.17.0 AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_BASE_URL  
RUN npm run build


# Stage 2: Serve the application using nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]