<template>
  <main-layout>

    <el-tag type="warning">Coming soon...</el-tag>

  </main-layout>
</template>

<script>
  import { redirectIfNewUser } from '@/store/utility/mixins'

  export default {
    name: 'user-journeys',
    mixins: [redirectIfNewUser]
  }
</script>