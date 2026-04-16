FROM node:lts-alpine3.23@sha256:ff2c02f071f9e56778013b47d70f7524f5d4eacb032027f0f434838d77cf25e0 AS base
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

FROM base AS builder
RUN npm run build

######## DEVELOPMENT IMAGE ########

FROM alpine:3.23.3@sha256:25109184c71bdad752c8312a8623239686a9a2071e8825f20acb8f2198c3f659 AS dev
LABEL org.opencontainers.image.authors="Mikołaj Nadra <m.nadra@proton.me>"

RUN apk add --update --no-cache npm curl && \
addgroup -S node && adduser -S node -G node

WORKDIR /app
COPY --from=base --chown=node:node /app . 

HEALTHCHECK --interval=10s --timeout=1s \
    CMD curl -f http://localhost:5173/ || exit 1

USER node
EXPOSE 5173
CMD ["npm", "run", "dev"]

######## PRODUCTION IMAGE ########

FROM alpine:3.23.3@sha256:25109184c71bdad752c8312a8623239686a9a2071e8825f20acb8f2198c3f659
LABEL org.opencontainers.image.authors="Mikołaj Nadra <m.nadra@proton.me>"

RUN apk add --update --no-cache nginx curl

COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=10s --timeout=1s \
    CMD curl -f http://localhost:80/ || exit 1

USER nginx
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]