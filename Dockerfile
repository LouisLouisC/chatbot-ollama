# ---- Base Node ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# ---- Production ----
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/next-i18next.config.js ./next-i18next.config.js

# Set the environment variable
ENV DEFAULT_MODEL="llama3.2:3b"
ENV OLLAMA_HOST="http://llama-server:11434"
# ENV OLLAMA_HOST="http://louis-llm.waftest.weborion.net"

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
