# Stage 1: Install dependencies
FROM node:20 AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Stage 2: Run tests
FROM deps AS test
COPY . .
RUN npm test

# Stage 3: Build (copies from TEST stage, not deps!)
FROM test AS build
RUN npm run build

# Stage 4: Production
FROM nginx:1.25-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html