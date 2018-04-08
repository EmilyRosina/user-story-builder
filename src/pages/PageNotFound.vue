<template>
  <main-layout>
    <h4>Oops!</h4>
    <p>Page not found</p>
    <router-link :to="{name: 'home'}">Go back to home</router-link>
  </main-layout>
</template>

<script>
  export default {
    name: 'page-not-found'
  }
</script>

<style lang="scss" scoped>

</style>
