# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
RUN echo "SKIP_PREFLIGHT_CHECK=true" > .env
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app

ENV PORT=80

CMD ["npm", "run", "start"]
