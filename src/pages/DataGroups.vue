<template>
  <main-layout>

    <el-tag v-if="false" type="warning">Coming soon...</el-tag>
    <modal-add-data-group v-if="modalShowing.addDataGroup"></modal-add-data-group>

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
  import ModalAddDataGroup from '@/components/Modal/AddDataGroup'
  import { mapGetters } from 'vuex'
  import { redirectIfNewUser } from 'utils/mixins'

  export default {
    name: 'data-groups',
    mixins: [redirectIfNewUser],
    components: {
      BtnAddDataGroup,
      DataGroupList,
      ModalAddDataGroup
    },
    mounted () {
      this.$store.commit('setActiveTab', 'dataGroups')
    },
    computed: {
      ...mapGetters([
        'modalShowing',
        'project'
      ]),

      haveDataGroups () {
        return this.project.dataGroups.length > 0
      }

    }
  }
</script>

<style lang="scss" scoped>

</style>
