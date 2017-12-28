<template>
  <el-container class="main-layout">

    <el-header>User Story Builder</el-header>

    <el-main>
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="Data Groups" name="dataGroups">Data Groups</el-tab-pane>
        <el-tab-pane label="User Stories" name="userStories">User Stories</el-tab-pane>
      </el-tabs>
      <slot></slot>
    </el-main>

    <el-footer>EmilyRosina &copy; {{ thisYear }}</el-footer>

  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        activeTab: 'dataGroups'
      }
    },
    methods: {
      handleClick (selectedTab) {
        this.activeTab = selectedTab
      }
    },
    computed: {
      thisYear () {
        /* eslint-disable no-new */
        return (new Date()).getFullYear()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
    align-items: center;
  }
  .el-header {
    @extend .flex;
    justify-content: space-between;
    background: #111;
    color: gold;
  }
  .el-main {
    background: #444;
    color: white;
  }
  .el-footer {
    @extend .flex;
    justify-content: center;
    background: #222;
    color: lightseagreen;
  }
</style>
