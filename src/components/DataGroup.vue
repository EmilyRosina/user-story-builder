<template>
  <el-button type="warning" class="add-data-group" @click="showDataInConsole" style="width: 100%;">
    <el-row type="flex" style="justify-content: space-between;">
      <span>{{ info.name }}</span>
      <el-badge>{{ info.properties.length }}</el-badge>
    </el-row>
  </el-button>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    methods: {
      showDataInConsole () {
        console.log('datagroup clicked! - ', this.info)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-button {
    color: #111;
  }
  .el-badge {
    background: #3c3c3c;
    width: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 1em;
    text-align: center;
    font-size: 0.75rem;
  }
</style>
