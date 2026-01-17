FROM node:lts-alpine@sha256:931d7d57f8c1fd0e2179dbff7cc7da4c9dd100998bc2b32afc85142d8efbc213
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . ./
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "server.js"]