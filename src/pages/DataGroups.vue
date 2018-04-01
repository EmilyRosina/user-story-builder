<template>
  <main-layout slot="content">

    <el-row v-if="addingNewDataGroup">
      <new-data-group></new-data-group>
    </el-row>

    <el-row v-if="editingDataGroup">
      <edit-data-group></edit-data-group>
    </el-row>

    <el-row style="padding: 2em;" v-if="!addingNewDataGroup && !editingDataGroup" :gutter="20">
      <el-col :span="6" style="padding-top: 20px;">
        <add-data-group @click.native="addNewDataGroup" v-if="!addingNewDataGroup && !editingDataGroup"></add-data-group>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(dataGroup, index) in dataGroups" :key="dataGroup.name" style="padding-top: 20px;">
            <data-group :info="dataGroup" @click.native="editDataGroup(dataGroup, index)"></data-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </main-layout>
</template>

<script>
  import AddDataGroup from '@/components/DataGroup/Add'
  import EditDataGroup from '@/components/DataGroup/Edit'
  import NewDataGroup from '@/components/DataGroup/New'
  import DataGroup from '@/components/DataGroup'

  export default {
    data () {
      return {

      }
    },
    components: {
      AddDataGroup,
      DataGroup,
      NewDataGroup,
      EditDataGroup
    },
    methods: {
      editDataGroup (dataGroup, index) {
        this.$store.state.selectedDataGroup.index = index
        this.$store.state.selectedDataGroup.dataGroup = dataGroup
        this.$store.state.editingDataGroup = true
      },
      addNewDataGroup () {
        this.$store.state.addingNewDataGroup = true
      }
    },
    computed: {
      state () {
        return this.$store.state
      },
      thisYear () {
        return (new Date()).getFullYear()
      },
      dataGroups () {
        return this.$store.state.dataGroups
      },
      addingNewDataGroup () {
        return this.$store.state.addingNewDataGroup
      },
      editingDataGroup () {
        return this.$store.state.editingDataGroup
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
