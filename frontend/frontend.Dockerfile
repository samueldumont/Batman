# when changing version, do update all Dockerfile*s in this repo!!!
FROM node:10-alpine AS build-env

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node
ARG PORT=9000
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --verbose --strict-ssl=false && \
  npm cache clean --force && \
  npm install --strict-ssl=false -g nodemon gatsby-cli gatsby

COPY . /usr/src/app

RUN gatsby build

RUN ls -altrh /usr/src/app

FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=0 /usr/src/app/public /static
