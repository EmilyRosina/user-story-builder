<template>
  <el-col type="flex" :span="12" :offset="6" class="new-data-group">
    <h4 class="title">new data group</h4>
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
      <el-button type="warning" plain :disabled="nameNotEntered" @click="addNewDataGroup">Add</el-button>
    </el-row>

  </el-col>
</template>

<script>
  export default {
    data () {
      return {
        firstChance: true,
        name: '',
        properties: [
          {
            key: 1,
            value: ''
          }
        ]
      }
    },
    methods: {
      isFirst (index) {
        return index === 0
      },
      addOption () {
        this.options.push({
          key: Date.now(),
          value: ''
        })
      },
      removeOption (index) {
        this.options.splice(index, 1)
      },
      addNewDataGroup () {
        this.$store.state.dataGroups.push({
          name: this.name,
          properties: this.properties
        })
        this.$store.state.addingNewDataGroup = false
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
  .new-data-group {
    border: 1px solid #eb9e05;
    background: rgba(0,0,0,0.45);
    padding: 1em 2em;
  }
  .el-input {
    flex: 1 0 auto;
    width: initial;
  }
</style>
