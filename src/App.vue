<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import utils from 'utils/index'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    created () {
      this.$store.commit('setBreakpoint', utils.breakpoint(window.innerWidth))
      window.addEventListener('resize', () => {
        const breakpoint = utils.breakpoint(window.innerWidth)
        if (!this.breakpointIs(breakpoint)) this.$store.commit('setBreakpoint', breakpoint)
      })
      this.$store.dispatch('GET_PROJECTS')
      if (this.isReturningUser) {
        if (this.hasMultipleProjects) {
          const projectId = this.projectIds[0]
          this.$store.commit('setActiveProjectId', projectId)
          this.$store.dispatch('GET_PROJECT_DATA', { id: projectId })
        } else {
          this.$store.commit('setActiveProjectId', this.projectIds[0])
        }
      }
    },
    computed: {
      ...mapGetters([
        'isReturningUser',
        'breakpointIs',
        'projectIds',
        'hasMultipleProjects'
      ])
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    .el-container {
      height: 100%;
    }
  }
  body {
    margin: 0;
    height: 100vh;
  }
</style>
