# Build stage
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

# Runtime stage
FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
ENV PORT=5000
ARG MONGO_URI
ENV MONGO_URI=$MONGO_URI
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET
EXPOSE ${PORT}
CMD ["node", "dist/index.js"]