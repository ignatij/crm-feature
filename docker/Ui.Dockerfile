FROM node:20-alpine as builder
RUN yarn set version 4.0.2

WORKDIR /usr/src/app

COPY .yarn/ ./.yarn/
COPY .pnp.cjs .pnp.loader.mjs package.json yarn.lock ./
COPY ./ui/ ./ui/
RUN yarn install

ENV NODE_ENV="production"
RUN yarn ui:build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/ui/dist /usr/share/nginx/html
COPY --from=builder /usr/src/app/ui/nginx.conf /etc/nginx/conf.d/default.conf
RUN apk add --no-cache bash
EXPOSE 8080
CMD ["/bin/bash", "-c", "cd /usr/share/nginx/html && nginx -g \"daemon off;\""]