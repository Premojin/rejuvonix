# Multi-stage image for a future AWS ECS/Fargate deployment.
# No secrets are copied into the image; inject runtime values from Secrets Manager.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN ./node_modules/.bin/vinext build

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=node:node /app/package*.json ./
RUN npm ci --omit=dev --ignore-scripts \
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["./node_modules/.bin/vinext", "start"]
