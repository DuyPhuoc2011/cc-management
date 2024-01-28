# Stage 1: Build the React app
FROM node:18-alpine as build

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.21-alpine

COPY --from=build /app/build /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
