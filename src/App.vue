<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      this.$store.dispatch('GET_PROJECT_IDS')
      if (this.$store.state.projectIds.length > 0) {
        const projectId = this.$store.state.projectIds[0]
        this.$store.dispatch('GET_PROJECT_DATA', { projectId })
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
