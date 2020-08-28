### STAGE 1: Build ###
FROM node:12-alpine AS build
WORKDIR /
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /app.zip /usr/share/nginx/html/assets/app.zip
COPY --from=build /app/site /usr/share/nginx/html
