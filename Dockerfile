FROM node:lts-alpine

ARG VUE_APP_BACKEND_ENDPOINT

# install simple http server for serving static content
RUN npm install -g http-server

# install git
RUN apk add --no-cache git

WORKDIR /

RUN git clone https://github.com/bluecube-it/morbido-frontend.git

WORKDIR /morbido-frontend

# install project dependencies
RUN yarn install

# build app for production with minification
RUN yarn build

EXPOSE 8080
CMD [ "http-server", "-p", "8080", "dist" ]
