<template>
  <el-col :lg="6" :md="8" :sm="10" class="U--margin-auto U--unset-float">
    <el-button type="warning" plain @click.native="openModal('addDataGroup')" class="U--full-width">Add Data Group</el-button>
  </el-col>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'btn-add-data-group',
    methods: {
      ...mapMutations([
        'openModal'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>
