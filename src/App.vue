<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main-layout');
    },
  },
};
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
