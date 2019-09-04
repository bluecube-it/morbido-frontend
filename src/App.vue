<template>
  <div id="app">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Morbido.ml</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search"
        aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link">
                  <activity-icon></activity-icon>
                  Dashboard <span class="sr-only">(current)</span>
                </router-link>
              </li>
            </ul>

            <h6
              class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Menu Header</span>
              <a class="d-flex align-items-center text-muted" href="#"
                aria-label="Add a new report">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link to="/upload-datasets" class="nav-link">
                  <upload-cloud-icon></upload-cloud-icon>
                  Upload Datasets
                </router-link> 
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ActivityIcon,
    UploadCloudIcon
  } from 'vue-feather-icons';

  export default {
    components: {
      ActivityIcon,
      UploadCloudIcon
    }
  }
</script>

<style scoped>
  .router-link-active {
    color: #007bff!important;
    text-decoration: none;
    background-color: transparent;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
