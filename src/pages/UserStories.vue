<template>
  <main-layout>

    <el-tag type="warning">Coming soon...</el-tag>

    <el-row v-if="false">
      <user-story></user-story>
    </el-row>

  </main-layout>
</template>

<script>
  import UserStory from '@/components/UserStory'
  import {redirectIfNewUser} from '@/store/utility/mixins'

  export default {
    name: 'user-stories',
    mixins: [redirectIfNewUser],
    components: {
      UserStory
    }
  }
</script>