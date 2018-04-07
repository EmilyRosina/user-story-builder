<template>
  <el-col :span="18">
    <el-row :gutter="20">
      <el-col :span="12" v-for="(dataGroup, index) in dataGroups" :key="dataGroup.name" style="padding-top: 20px;">
        <data-group :info="dataGroup" @click.native="editDataGroup(dataGroup, index)"></data-group>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        dataGroups: state => state.active.project.dataGroups
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
