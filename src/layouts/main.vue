<template>
  <el-container>

    <el-header>User Story Builder</el-header>

    <el-main>
      <slot></slot>
    </el-main>

    <el-footer>EmilyRosina &copy; {{ thisYear }}</el-footer>

  </el-container>
</template>

<script>
  export default {

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
