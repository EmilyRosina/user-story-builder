<template>
  <el-col type="flex" :span="12" :offset="6" class="edit-data-group">

    <el-row type="flex" justify="end" class="close-bar">
      <icon name="times" class="icon" scale="1.5" @click.native="cancel"></icon>
    </el-row>
    <h4 class="title">{{ title }}</h4>
    <el-row type="flex" class="section">
      <el-col>
        <span class="subtitle required">Name</span>
        <el-row type="flex">
          <el-input v-model.trim="name" class="centered" @blur="typing = true"></el-input>
        </el-row>
        <span v-if="nameNotEntered && !typing" class="rules">You need to enter a name</span>
        <span v-else-if="nameAlreadyExists && !matchesOriginalName" class="rules">You already have a data group with that name</span>
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

    <el-row type="flex" class="section">
      <el-col style="display: flex;" :span="4">
        <icon name="trash" scale="1.75" @click.native="deleteDataGroup" class="delete-data-group"></icon>
      </el-col>
      <el-col :span="16">
        <el-button type="warning" plain :disabled="nameNotEntered || (nameAlreadyExists && !matchesOriginalName)" @click="saveDataGroup" class="save-btn">Save</el-button>
      </el-col>
    </el-row>

  </el-col>
</template>

<script>
  export default {
    props: {
      mode: {
        type: String,
        required: true
      }
    },
    mounted () {
      if (this.mode === 'edit') {
        this.index = this.$store.getters.selected.dataGroup.index
        this.name = this.$store.getters.selected.dataGroup.dataGroup.name
        this.properties = this.$store.getters.selected.dataGroup.dataGroup.properties
      }
    },
    data () {
      return {
        typing: false,
        index: null,
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
      saveDataGroup () {
        // FIXME: move to action/mutation
        if (this.properties[0] && !this.properties[0].value) {
          this.removeOption(0)
        }
        this.$store.state.active.dataGroups[this.index] = {
          name: this.name,
          properties: this.properties
        }
        this.$store.getters.selected.dataGroup.index = null
        this.$store.getters.selected.dataGroup.dataGroup = null
        this.cancel()
      },
      deleteDataGroup () {
        // FIXME: move to action/mutation
        this.$store.state.active.dataGroups.splice(this.index, 1)
        this.$store.getters.selected.dataGroup.index = null
        this.$store.getters.selected.dataGroup.dataGroup = null
        this.cancel()
      },
      cancel () {
        this.$store.state.ui.dataGroup.editing = false
      }
    },
    computed: {
      title () {
        return `${this.mode} data group`
      },
      matchesOriginalName () {
        return this.$store.state.active.dataGroups[this.index].name === this.name
      },
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
  .edit-data-group {
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
  .save-btn {
    align-self: center;
  }
  .delete-data-group {
    color: #680808;
    align-self: flex-end;
  }
</style>
