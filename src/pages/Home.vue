<template>
  <main-layout>
    <p>welcome!</p>
  </main-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'home',
    computed: {
      ...mapGetters([
        'isNewUser'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>
