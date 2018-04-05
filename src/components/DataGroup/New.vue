<template>
  <el-col type="flex" :span="12" :offset="6" class="new-data-group">
    <el-row type="flex" justify="end" class="close-bar">
      <icon name="times" class="icon" scale="1.5" @click.native="cancel"></icon>
    </el-row>
    <h4 class="title">new data group</h4>
    <el-row type="flex" class="section">
      <el-col>
        <span class="subtitle required">Name</span>
        <el-row type="flex">
          <el-input v-model.trim="name" class="centered" @blur="firstChance = false"></el-input>
        </el-row>
        <span v-if="nameNotEntered && !firstChance" class="rules">You need to enter a name</span>
        <span v-else-if="nameAlreadyExists" class="rules">You already have a data group with that name</span>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-col>
        <span class="subtitle">Properties</span>
        <template v-if="hasProperties">
          <el-row type="flex" class="no-gutter" v-for="(property, index) in properties" :key="index">
            <el-input placeholder="" v-model.trim="property.value"></el-input>
            <el-button-group class="joint-input">
              <el-button @click="removeOption(index)" type="warning" plain class="remove">-</el-button>
              <el-button @click="addOption()" type="warning" plain class="add">+</el-button>
            </el-button-group>
          </el-row>
        </template>
        <template v-else>
          <el-row type="flex" class="no-gutter">
            <add-property @click.native="addOption()"></add-property>
          </el-row>
        </template>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-button type="warning" plain :disabled="nameNotEntered || nameAlreadyExists" @click="addNewDataGroup">Add</el-button>
    </el-row>

  </el-col>
</template>

<script>
  import addProperty from './AddProperty'

  export default {
    components: {
      addProperty
    },
    data () {
      return {
        firstChance: true,
        name: '',
        properties: []
      }
    },
    methods: {
      isFirst (index) {
        return index === 0
      },
      initialiseProperties (event) {
        this.addOption(event.target.value)
      },
      addOption (value = '') {
        this.properties.push({
          key: Date.now(),
          value
        })
      },
      removeOption (index) {
        this.properties.splice(index, 1)
      },
      addNewDataGroup () {
        this.$store.state.active.dataGroups.push({
          name: this.name,
          properties: this.properties
        })
        this.$store.state.addingNewDataGroup = false
      },
      cancel () {
        this.$store.state.addingNewDataGroup = false
      }
    },
    computed: {
      nameAlreadyExists () {
        return this.$store.state.active.dataGroups.map(dataGroup => {
          return dataGroup.name
        }).includes(this.name)
      },
      nameNotEntered () {
        return this.name === ''
      },
      hasProperties () {
        return this.properties.length > 0
      },
      onlyOneProperty () {
        return this.propertiesLength === 1
      },
      propertiesLength () {
        return this.properties.length
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin hover-focus-active {
      &:hover, &:focus, &:active {
          @content;
      }
  }

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
    background: rgba(0,0,0,0.45);
    padding: 1em 2em;
    min-width: 25em;
  }
  .el-input {
    flex: 1 0 auto;
    width: initial;
  }
  .close-bar {
    margin-bottom: -1em;
    width: calc(100% + 2em);
    padding: 0 1em;
    .icon {
      color:rgba(255,255,255,0.15);
      transition: 0.25s;
      @include hover-focus-active {
        color: darkorange
      }
    }
  }
</style>
