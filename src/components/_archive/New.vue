<!-- TODO: REMOVE -->

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
        <el-tag v-for="(error, index) in errors" :key="index" type="danger" size="mini">{{ error }}</el-tag>
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
            <el-button type="warning" plain @click.native="addOption()" class="U--full-width">Add Property</el-button>
          </el-row>
        </template>
      </el-col>
    </el-row>

    <el-row class="section">
      <el-button type="warning" plain :disabled="!validated" @click="addNewDataGroup">Add</el-button>
    </el-row>

  </el-col>
</template>

<script>
  export default {
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
        this.cancel()
      },
      cancel () {
        this.$store.state.ui.dataGroup.adding = false
      }
    },
    computed: {
      validationChecks () {
        return {
          hasName: this.name !== '',
          nameIsUnique: !this.$store.state.active.project.dataGroups
            .map(dataGroup => {
              return dataGroup.name
            })
            .includes(this.name),
          typing: this.firstChance === false
        }
      },
      errors () {
        let errors = []
        let check = this.validationChecks
        if (check.typing) {
          if (!check.hasName) { errors.push('You must supply a name') }
          if (!check.nameIsUnique) { errors.push('Name already exists') }
        }
        return errors
      },
      validated () {
        return !Object.values(this.validationChecks).includes(false)
      },
      hasProperties () {
        return this.properties.length > 0
      },
      propertyNames () {
        return this.properties.map(property => {
          return property.value
        })
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
    float: unset;
    margin: auto;
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
