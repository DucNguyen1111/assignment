# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Docker cache node_modules if package.json or package-lock.json don't change
COPY --chown=node:node package.json package-lock.json ./

# Install the dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY --chown=node:node . .

# Build the Next.js application
RUN npx nx build client

# Stage 2: Create the production image
FROM node:18-alpine AS run

WORKDIR /usr/src/app

# Copy the built application from the previous stage
COPY --chown=node:node --from=build /usr/src/app/apps/client/.next ./.next
COPY --chown=node:node --from=build /usr/src/app/apps/client/public ./public
COPY --chown=node:node --from=build /usr/src/app/apps/client/env.example .env
COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/package-lock.json ./

# Install only production dependencies using npm
RUN npm install --omit=dev

# Expose the port that the application will listen on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
