<template>
  <main-layout>

    <el-tag v-if="false" type="warning">Coming soon...</el-tag>
    <modal-add-data-group v-if="modalShowing.addDataGroup"></modal-add-data-group>

    <el-row>
      <btn-add-data-group></btn-add-data-group>
      <data-group-list v-if="haveDataGroups"></data-group-list>
    </el-row>

  </main-layout>
</template>

<script>
  import DataGroup from '@/components/DataGroup'
  import BtnAddDataGroup from '@/components/DataGroup/Add'
  import DataGroupList from '@/components/DataGroup/List'
  import ModalAddDataGroup from '@/components/Modal/DataGroup/Add'
  import { mapGetters } from 'vuex'
  import { redirectIfNewUser } from 'utils/mixins'

  export default {
    name: 'data-groups',
    mixins: [redirectIfNewUser],
    components: {
      BtnAddDataGroup,
      DataGroup,
      DataGroupList,
      ModalAddDataGroup
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
