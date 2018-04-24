<template>
  <el-col>
    <el-row :gutter="20" no-gutters>
      <el-col :sm="12" :lg="8" v-for="(dataGroup, index) in dataGroups" :key="dataGroup.id">
        <data-group :dataGroup="dataGroup" :index="index"></data-group>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DataGroup from '@/components/DataGroup'

  export default {
    name: 'data-group-list',
    components: {
      DataGroup
    },
    computed: {
      ...mapGetters([
        'project'
      ]),

      dataGroups () {
        return this.project.dataGroups
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
