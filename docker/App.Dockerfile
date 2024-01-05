FROM node:20-alpine as builder
RUN yarn set version 4.0.2

WORKDIR /usr/src/app

COPY .yarn/ ./.yarn/
COPY .pnp.cjs .pnp.loader.mjs package.json yarn.lock ./
COPY ./app/ ./app/
RUN yarn install

ENV NODE_ENV="production"

ENV PORT="8000"
EXPOSE 8000

CMD ["yarn", "app:start"]