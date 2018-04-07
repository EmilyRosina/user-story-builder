<template>
  <div class="project-bar">
    <!-- <el-input value="Project 1" class="project-bar__name" /> -->
    <h4>{{ active.project.name }}</h4>
    <icon name="cog" class="icon"></icon>
    <el-button type="danger" icon="el-icon-delete" circle size="mini" class="icon" @click="deleteAllProjects"></el-button>
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
    },
    methods: {
      deleteAllProjects () {
        this.$store.getters.projectIds.forEach(projectId => {
          localStorage.removeItem(projectId)
        })
        this.$store.commit('deleteAllProjects')
        this.$router.push({ name: 'home' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    padding: 0.65em;
  }
</style>
