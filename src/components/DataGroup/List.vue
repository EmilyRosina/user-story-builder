<template>
  <el-col>
    <el-row :gutter="20" no-gutters>
      <el-col :sm="12" :lg="8" v-for="(dataGroup, index) in dataGroups" :key="dataGroup.id">
        <data-group-block :dataGroup="dataGroup" @click.native="editDataGroup(dataGroup, index)"></data-group-block>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DataGroupBlock from '@/components/DataGroup/Block'

  export default {
    components: {
      DataGroupBlock
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
