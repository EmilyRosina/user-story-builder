<template>
  <main-layout>

    <el-row>

      <data-group mode="add"  v-if="addingDataGroup"></data-group>
      <data-group mode="edit" v-if="editingDataGroup"></data-group>
      <btn-add-data-group v-else></btn-add-data-group>

      <data-group-list v-if="haveDataGroups"></data-group-list>

    </el-row>

  </main-layout>
</template>

<script>
  import DataGroup from '@/components/DataGroup'
  import BtnAddDataGroup from '@/components/DataGroup/Add'
  import DataGroupList from '@/components/DataGroup/List'
  import { mapState } from 'vuex'
  import { redirectIfNewUser } from '@/store/utility/mixins'

  export default {
    mixins: [redirectIfNewUser],
    components: {
      BtnAddDataGroup,
      DataGroup,
      DataGroupList
    },
    computed: {
      ...mapState({
        haveDataGroups: state => state.active.project.dataGroups.length > 0,
        addingDataGroup: state => state.ui.dataGroup.adding,
        editingDataGroup: state => state.ui.dataGroup.editing
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
