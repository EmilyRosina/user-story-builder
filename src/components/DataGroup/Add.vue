<template>
  <el-col>
    <el-button type="warning" plain @click.native="openModal('addDataGroup')" class="U--full-width">Add Data Group</el-button>
  </el-col>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    methods: {
      ...mapMutations([
        'openModal'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>
