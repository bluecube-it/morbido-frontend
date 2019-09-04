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
              <router-link to="/dashboard">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <activity-icon></activity-icon>
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>
              </router-link>
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
              <router-link to="/about">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <calendar-icon></calendar-icon>
                  Current month
                </a>
              </li>
              </router-link> 
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ActivityIcon,
    CalendarIcon
  } from 'vue-feather-icons';

  export default {
    components: {
      ActivityIcon,
      CalendarIcon
    }
  }

</script>
