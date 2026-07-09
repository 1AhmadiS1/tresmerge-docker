FROM node:22 AS base
WORKDIR /app
COPY package.json package-lock.json ./

# ---------------- DEV ----------------
FROM base AS development
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start-dev"]

# ---------------- PROD ----------------
FROM base AS production
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]