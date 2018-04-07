<template>
  <el-col>
    <el-button type="warning" plain @click.native="addNewDataGroup" class="U--full-width">Add Data Group</el-button>
  </el-col>
</template>

<script>
  export default {
    methods: {
      addNewDataGroup () {
        this.$store.state.ui.dataGroup.adding = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
