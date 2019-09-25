# Morbido Frontend

## How to run with Dockerfile
In order to run application with dockerfile you need to pass the VUE_APP_BACKEND_ENDPOINT argument, like this:

```bash
docker build --build-arg VUE_APP_BACKEND_ENDPOINT=http://endpoint.that.you.want -t morbido-frontend .
```

## Without Dockerfile

In your project root:

```bash
cp .env.example .env
```

Change the values as you please.

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
