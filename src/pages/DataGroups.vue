<template>
  <main-layout>

    <el-tag v-if="dataGroupsIsArray" type="danger" class="el-tag--text-wrap">Not using latest version of datagroups builder, please delete this project</el-tag>

    <modal-config-data-group mode="add" v-if="modalShowing.addDataGroup"></modal-config-data-group>

    <el-row>
      <btn-add-data-group></btn-add-data-group>
    </el-row>

    <el-row>
      <data-group-list v-if="haveDataGroups"></data-group-list>
    </el-row>

  </main-layout>
</template>

<script>
  import BtnAddDataGroup from '@/components/BtnAddDataGroup'
  import DataGroupList from '@/components/DataGroupList'
  import ModalConfigDataGroup from '@/components/Modal/ConfigDataGroup'
  import { mapGetters } from 'vuex'
  import { redirectIfNewUser } from 'utils/mixins'

  export default {
    name: 'data-groups',
    mixins: [redirectIfNewUser],
    components: {
      BtnAddDataGroup,
      DataGroupList,
      ModalConfigDataGroup
    },
    mounted () {
      this.$store.commit('setActiveTab', 'dataGroups')
    },
    computed: {
      ...mapGetters([
        'modalShowing',
        'project'
      ]),

      dataGroupsIsArray () {
        return this.project ? Array.isArray(this.project.dataGroups) : false
      },
      haveDataGroups () {
        return this.project ? Object.keys(this.project.dataGroups).length > 0 : false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-tag--text-wrap {
    white-space: normal;
    height: auto;
    line-height: 1.5rem;
  }
</style>
