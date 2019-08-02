# when changing version, do update all Dockerfile*s in this repo!!!
FROM node:10-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/ktb.crt

# default to port 3000 for node
ARG PORT=80
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

# the official node image provides an unprivileged user as a security best practice
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

CMD [ "gatsby", "serve" ]
