FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# install git
RUN apk add --no-cache git

WORKDIR /

# copy both 'package.json' and 'package-lock.json' (if available)
RUN git clone http://gitlab.internal.bluecube.it/Renny/morbido-frontend.git

WORKDIR /morbido-frontend

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "-p", "80", "dist" ]
