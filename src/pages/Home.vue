<template>
  <el-container id="home-page">
    <el-header>User Story Builder</el-header>
    <el-main>
      <add-data-group @click.native="addNewDataGroup" v-if="!addingNewDataGroup"></add-data-group>
      <el-row v-if="addingNewDataGroup">
        <new-data-group></new-data-group>
      </el-row>
      <el-row style="padding: 2em;" v-if="!addingNewDataGroup">
        <el-col span="6" v-for="dataGroup in dataGroups" :key="dataGroup.name">
          <data-group :info="dataGroup"></data-group>
        </el-col>
      </el-row>
      <slot></slot>
    </el-main>
    <el-footer>EmilyRosina &copy; {{ thisYear }}</el-footer>
  </el-container>
</template>

<script>
  import AddDataGroup from '@/components/AddDataGroup'
  import DataGroup from '@/components/DataGroup'
  import NewDataGroup from '@/components/NewDataGroup'

  export default {
    data () {
      return {

      }
    },
    components: {
      AddDataGroup,
      DataGroup,
      NewDataGroup
    },
    methods: {
      addNewDataGroup () {
        this.$store.state.addingNewDataGroup = true
      }
    },
    computed: {
      thisYear () {
        return (new Date()).getFullYear()
      },
      dataGroups () {
        return this.$store.state.dataGroups
      },
      addingNewDataGroup () {
        return this.$store.state.addingNewDataGroup
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
