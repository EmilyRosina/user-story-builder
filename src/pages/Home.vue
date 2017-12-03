<template>
  <el-container id="home-page">
    <el-header>User Story Builder</el-header>
    <el-main>
      <add-data-group></add-data-group>
      <slot></slot>
    </el-main>
    <el-footer>EmilyRosina &copy; {{ thisYear }}</el-footer>
  </el-container>
</template>

<script>
  import AddDataGroup from '@/components/AddDataGroup'
  export default {
    data () {
      return {
        dataGroups: [],
        newDataGroup: {
          name: '',
          type: '',
          of: '', // only for type === 'array'
          properties: [] // only for type === 'object'
        }
      }
    },
    components: {
      AddDataGroup
    },
    computed: {
      thisYear () {
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
