<template>
  <el-col type="flex" :span="12" :offset="6" class="edit-data-group">
    <h4 class="title">edit data group</h4>
    <el-row type="flex" class="section">
      <el-col>
        <span class="subtitle required">Name</span>
        <el-row type="flex">
          <el-input v-model.trim="name" class="centered" @blur="firstChance = false"></el-input>
        </el-row>
        <span v-if="nameNotEntered && !firstChance" class="rules">You need to enter a name</span>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-col>
        <span class="subtitle">Properties</span>
        <el-row type="flex" class="no-gutter" v-for="(property, index) in properties" :key="property.key">
          <el-input placeholder="" v-model.trim="property.value"></el-input>
          <el-button-group class="joint-input">
            <el-button @click="!isFirst(index) ? removeOption(index) : null" type="warning" plain :class="['remove', {'cursor-not-allowed disabled': isFirst(index)}]">-</el-button>
            <el-button @click="addOption(index)" type="warning" plain class="add">+</el-button>
          </el-button-group>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-button type="warning" plain :disabled="nameNotEntered" @click="saveDataGroup">Save</el-button>
    </el-row>

  </el-col>
</template>

<script>
  export default {
    mounted () {
      this.index = this.$store.state.selectedDataGroup.index
      this.name = this.$store.state.selectedDataGroup.dataGroup.name
      this.properties = this.$store.state.selectedDataGroup.dataGroup.properties
    },
    data () {
      return {
        firstChance: true,
        index: null,
        name: null,
        properties: null
      }
    },
    methods: {
      isFirst (index) {
        return index === 0
      },
      addOption () {
        this.properties.push({
          key: Date.now(),
          value: ''
        })
      },
      removeOption (index) {
        this.properties.splice(index, 1)
      },
      saveDataGroup () {
        this.$store.state.dataGroups[this.index] = {
          name: this.name,
          properties: this.properties
        }
        this.$store.state.selectedDataGroup.index = null
        this.$store.state.selectedDataGroup.dataGroup = null
        this.$store.state.editingDataGroup = false
      }
    },
    computed: {
      nameNotEntered () {
        return this.name === ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    color: darkorange;
    font-weight: 200;
    text-transform: capitalize;
    display: block;
  }
  .subtitle {
    @extend .title;
    text-align: left;
  }
  .section {
    padding: 1em;
  }
  .no-gutter {
    margin: 0
  }
  .edit-data-group {
    background: rgba(0,0,0,0.45);
    padding: 1em 2em;
  }
  .el-input {
    flex: 1 0 auto;
    width: initial;
  }
</style>
