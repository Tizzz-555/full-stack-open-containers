FROM node:20 AS deps
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci

FROM deps AS test
COPY . .
RUN npm test

FROM test AS build
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html