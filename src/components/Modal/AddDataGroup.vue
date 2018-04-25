<template>
  <el-dialog
    title="add data group"
    :visible="showModal"
    :width="modalWidth"
    :close-on-click-modal="false"
    @close="closeModal()"
    class="add-data-group">

    <span>
      <el-row type="flex" class="section">
        <el-col>
          <span class="subtitle required">Name</span>
          <el-row type="flex">
            <el-input v-model.trim="name" class="centered" @keydown.once.native="typing = true" @blur.once.native="typing = true"></el-input>
          </el-row>
          <el-row class="error__wrapper">
            <el-tag v-for="(error, index) in errors.name" :key="`name_error_${index}`" type="danger">{{ error.text }}</el-tag>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="section">
        <el-col>
          <span v-if="hasProperties" class="subtitle">Properties</span>
          <template v-if="hasProperties">
            <el-row type="flex" class="no-gutter" v-for="(property, key) in properties" :key="key">
              <icon name="leaf" v-if="property._isNew()" style="color: yellowgreen; position: absolute; z-index: 100; left: -5px; top: -2px;"/>
              <div style="position: relative; display: flex; flex: 1 1 0%;">
                <el-input
                  placeholder=""
                  v-model.trim="property.value"
                  @keydown.once.native="startTyping(key)"
                  :class="['property-input', {'has-errors': !isUnique(property.value) || hasNoName(property)}]" />
                  <icon name="clone" v-if="nonUniqueProperties.includes(property.value)" style="position: absolute; color: tomato; right: 0.75em; top: 0.75em;" />
                  <icon name="exclamation-triangle" v-if="!property._isNew() && property._hasNoName()" style="position: absolute; color: tomato; right: 0.75em; top: 0.85em;" />
              </div>
              <el-button-group class="joint-input">
                <el-button @click="removeProperty(key)" type="warning" plain class="remove">
                  <icon name="minus" scale="0.75" />
                </el-button>
                <el-button @click="addProperty()" type="warning" plain class="add" :disabled="property === ''">
                  <icon name="plus" scale="0.75" />
                </el-button>
              </el-button-group>
            </el-row>
          </template>

          <template v-else>
            <el-row type="flex" class="no-gutter">
              <el-button type="warning" plain @click.native="addProperty()" class="U--full-width" :disabled="!typing">Add Property</el-button>
            </el-row>
          </template>
          <el-row class="error__wrapper">
            <el-tag v-for="(error, index) in errors.properties" :key="`property_error_${index}`" type="danger">
              <icon :name="error.icon" v-if="error.icon" />
              {{ error.text }}
            </el-tag>
          </el-row>
        </el-col>
      </el-row>
    </span>

    <span slot="footer">
      <el-button plain @click="addDataGroup" type="success" :disabled="!validated" class="U--full-width">Add data group</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import { closeModal, addEditDataGroup } from 'utils/mixins'
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'modal-add-data-group',
    mixins: [closeModal, addEditDataGroup],
    data () {
      return {
        id: '',
        name: '',
        properties: {},
        typing: false
      }
    },
    created () {
      this.id = String(Date.now())
    },
    methods: {
      ...mapActions([
        'SET_PROJECT_DATA'
      ]),

      hasNoName (property) {
        return property.new ? false : property.value === ''
      },
      isUnique (name) {
        return name !== '' ? !this.nonUniqueProperties.includes(name) : true
      },
      addDataGroup () {
        let dataGroups = Object.assign({}, this.project.dataGroups)
        dataGroups[this.id] = {
          id: this.id,
          name: this.name,
          properties: this.properties
        }
        let project = Object.assign({}, this.project, { dataGroups })
        this.SET_PROJECT_DATA(project)
        this.closeModal()
      }
    },
    computed: {
      ...mapState([
        'active'
      ]),
      ...mapGetters([
        'project',
        'breakpointIs'
      ]),

      showModal () {
        return this.active.modal === 'addDataGroup'
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
    text-transform: capitalize;
    display: block;
  }
  .subtitle {
    @extend .title;
    text-align: left;
  }
  .no-gutter {
    margin: 0
  }
  .property-input {
    flex: 1 1 0%;
  }
  .error__wrapper {
    margin-top: 0.75em;
  }
</style>
