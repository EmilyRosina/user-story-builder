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

  export default {
    components: {
      UserStory
    }
  }
</script>