# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Docker cache node_module if package.json not change, if package change then docker rebuild (npm install)
# flag --chown=node:node is only user node, not use user root
COPY --chown=node:node package.json package-lock.json ./

# Install the dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY --chown=node:node . .

# Generate prisma client
RUN npx prisma generate --schema=./apps/image-service/prisma/schema.prisma

# Build the service
RUN npx nx build image-service

# Stage 2: Create the production image
FROM node:18-alpine AS run

WORKDIR /usr/src/app

# Copy the built application from the previous stage
COPY --chown=node:node --from=build /usr/src/app/dist/apps/image-service ./dist
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

# Install only production dependencies using npm
RUN npm install --omit=dev

RUN npm install -g pm2

# Expose the port that the application will listen on
EXPOSE 8080

CMD ["pm2-runtime", "start", "dist/main.js"]