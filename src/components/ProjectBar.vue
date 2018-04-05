<template>
  <div class="project-bar">
    <!-- <el-input value="Project 1" class="project-bar__name" /> -->
    <h4>{{ active.project.name }}</h4>
    <icon name="cog" class="project-bar__icon"></icon>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'project-bar',
    computed: {
      ...mapState([
        'active'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>
