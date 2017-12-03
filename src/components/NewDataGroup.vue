<template>
  <el-col type="flex" :span="12" :offset="6" class="new-data-group">
    <h4 class="title">Add new data group</h4>
    <el-row type="flex" class="section">
      <el-input v-model="name" class="centered"></el-input>
    </el-row>

    <el-row class="section">
      <el-col>
        <el-row type="flex" class="no-gutter" v-for="(addedOption, index) in options" :key="addedOption.key">
          <el-input placeholder="" v-model="addedOption.value"></el-input>
          <el-button-group>
            <el-button @click="!isFirst(index) ? removeOption(index) : null" type="warning" plain :class="['remove', {'cursor-not-allowed disabled': isFirst(index)}]">-</el-button>
            <el-button @click="addOption(index)" type="warning" plain class="add">+</el-button>
          </el-button-group>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-button>Save</el-button>
    </el-row>

  </el-col>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        options: [
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    color: #eb9e05;
    font-weight: 200;
    text-transform: capitalize;
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
