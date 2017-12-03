<template>
  <el-button type="info" plain class="add-data-group" @click="showDataInConsole">
    {{ info.name }}
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

</style>
