<template>
  <form class="form-signin">
    <img class="mb-4 logo-image" src="/images/morbido-logo.png" alt="Morbido Logo">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required=""
      autofocus="" v-model="user.username">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password"
      required="" v-model="user.password">
    <p class="text-danger" v-if="isError">Username or Password not correct</p>
    <button class="btn btn-lg btn-dark btn-block mt-5" type="button" @click="login">
        <span v-if="!isLoading">Sign in</span>
        <b-spinner large v-else variant="light" label="Spinning"></b-spinner>
    </button>
    <p class="mt-5 mb-3 text-muted">© 2019 Bluecube</p>
  </form>
</template>

<script>
import axios from 'axios';
import { endpoint } from '../utils/utils';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        grant_type: 'password',
        scope: '*',
        client_id: '1',
        // client_secret: 'v7t2xvmmwMJkOjWRL3KT9QXqh9PnDwamSiEVf3i9'
      },
      isError: false,
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isError = false;
      axios.post(`${endpoint}/v1/oauth/token`, this.user)
        .then(res => this.process(res.data))
        .catch(err => this.isError = true);
    },
    process(response) {
      this.isLoading = true;

      // Save in localstorage
      localStorage.setItem('jwt', response.access_token);
      localStorage.setItem('jwt_refresh', response.refresh_token);

      if (localStorage.getItem('jwt') != null) {
        if (this.$route.params.nextUrl != null) {
          this.$router.push(this.$route.params.nextUrl);
        } else {
          this.$router.push('dashboard');
        }
      }
    },
  },
};
</script>

<style scoped>
.logo-image {
    width: 100%;
    border-radius: .25rem;
}
.form-signin {
    max-width: 430px;
}
</style>
