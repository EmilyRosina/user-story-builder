<template>
  <main-layout>

    <p>User Journey</p>

  </main-layout>
</template>

<script>
  import { redirectIfNewUser } from '@/store/utility/mixins'

  export default {
    name: 'user-journeys',
    mixins: [redirectIfNewUser]
  }
</script>