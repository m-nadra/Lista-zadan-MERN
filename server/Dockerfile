FROM node:lts-alpine3.23@sha256:ff2c02f071f9e56778013b47d70f7524f5d4eacb032027f0f434838d77cf25e0 AS base
WORKDIR /app
COPY package*.json .

FROM base AS base_dev
RUN npm ci

FROM base AS base_prod
RUN npm ci --omit=dev

######## DEVELOPMENT IMAGE ########

FROM alpine:3.23.3@sha256:25109184c71bdad752c8312a8623239686a9a2071e8825f20acb8f2198c3f659 AS dev
LABEL org.opencontainers.image.authors="Mikołaj Nadra <m.nadra@proton.me>"
ENV NODE_ENV=development
ENV PORT=3000

RUN apk add --update --no-cache curl npm && \
addgroup -S node && adduser -S node -G node

WORKDIR /app
COPY --from=base_dev --chown=node:node /app .
COPY --chown=node:node . .

HEALTHCHECK --interval=10s --timeout=1s \
    CMD curl -f http://localhost:3000/health || exit 1

USER node
EXPOSE 3000
CMD ["npm", "run", "dev"]

######## PRODUCTION IMAGE ########

FROM alpine:3.23.3@sha256:25109184c71bdad752c8312a8623239686a9a2071e8825f20acb8f2198c3f659
LABEL org.opencontainers.image.authors="Mikołaj Nadra <m.nadra@proton.me>"
ENV NODE_ENV=production
ENV PORT=3000

RUN apk add --update --no-cache dumb-init curl npm && \
addgroup -S node && adduser -S node -G node

WORKDIR /app
COPY --from=base_prod --chown=node:node /app .
COPY --chown=node:node . .

HEALTHCHECK --interval=10s --timeout=1s \
    CMD curl -f http://localhost:3000/health || exit 1

USER node
EXPOSE 3000
CMD ["dumb-init", "npm", "start"]