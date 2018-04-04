<template>
  <main-layout>

    <p>User stories</p>

    <el-row>
      <user-story></user-story>
    </el-row>

  </main-layout>
</template>

<script>
  import UserStory from '@/components/UserStory'
  import {redirectIfNewUser} from '@/store/utility/mixins'

  export default {
    mixins: [redirectIfNewUser],
    components: {
      UserStory
    }
  }
</script>