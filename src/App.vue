<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import utils from 'utils/utils'

  export default {
    name: 'app',
    created () {
      this.$store.commit('setBreakpoint', utils.breakpoint(window.innerWidth))
      window.addEventListener('resize', () => {
        const breakpoint = utils.breakpoint(window.innerWidth)
        if (this.$store.state.breakpoint !== breakpoint) {
          this.$store.commit('setBreakpoint', breakpoint)
        }
      })
      this.$store.dispatch('GET_PROJECTS')
      if (this.$store.getters.projectIds.length > 0) {
        const projectId = this.$store.getters.projectIds[0]
        this.$store.dispatch('GET_PROJECT_DATA', { id: projectId })
      }
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
