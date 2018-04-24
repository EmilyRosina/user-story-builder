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
          <el-tag v-for="(error, index) in errors.name" :key="`name_error_${index}`" type="danger">{{ error }}</el-tag>
        </el-col>
      </el-row>

      <el-row class="section">
        <el-col>
          <span v-if="hasProperties" class="subtitle">Properties</span>

          <template v-if="hasProperties">
            <el-row type="flex" class="no-gutter" v-for="(property, index) in properties" :key="property.key">
              <icon name="leaf" v-if="property.new" style="color: yellowgreen; position: absolute; z-index: 100; left: -5px; top: -2px;"/>
              <el-input
                placeholder=""
                v-model.trim="property.value"
                @keydown.once.native="startTyping(property.key)"
                :class="['property-input', {'has-errors': !isUnique(property.value) || hasNoName(property)}]" />
              <el-button-group class="joint-input">
                <el-button @click="removeOption(index)" type="warning" plain class="remove">
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

          <el-tag v-for="(error, index) in errors.properties" :key="`property_error_${index}`" type="danger">{{ error }}</el-tag>
        </el-col>
      </el-row>
    </span>

    <!-- <el-row class="section">
      <el-button type="warning" plain :disabled="!validated" @click="addNewDataGroup">Add</el-button>
    </el-row> -->
    <span slot="footer">
      <el-button plain @click="addDataGroup" type="success" :disabled="!validated" class="U--full-width">Add data group</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import { closeModal } from 'utils/mixins'
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'modal-add-datagroup',
    mixins: [closeModal],
    data () {
      return {
        id: '',
        typing: false,
        name: '',
        properties: []
      }
    },
    created () {
      this.id = Date.now()
    },
    methods: {
      ...mapActions([
        'SET_PROJECT_DATA'
      ]),

      hasNoName (property) {
        return property.new ? false : property.value === ''
      },
      startTyping (key) {
        delete this.properties.find(prop => prop.key === key).new
      },
      isUnique (name) {
        return name !== '' ? !this.nonUniqueProperties.includes(name) : true
      },
      isFirst (index) {
        return index === 0
      },
      initialiseProperties (event) {
        this.addProperty(event.target.value)
      },
      addProperty (value = '') {
        this.properties.push({
          key: Date.now(),
          value,
          new: true
        })
      },
      removeOption (index) {
        this.properties.splice(index, 1)
      },
      addDataGroup () {
        let dataGroups = this.project.dataGroups.concat({ name: this.name, properties: this.properties, id: this.id })
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
      },
      modalWidth () {
        return this.breakpointIs('xs') ? '90%' : '500px'
      },
      nonUniqueProperties () {
        let propertiesMap = {}
        this.properties
          .forEach(prop => {
            propertiesMap[prop.value]
              ? propertiesMap[prop.value] = 'not unique'
              : propertiesMap[prop.value] = 'unique'
          })
        Object.keys(propertiesMap).forEach(propKey => {
          if (propertiesMap[propKey] === 'unique' || propKey === '') delete propertiesMap[propKey]
        })
        return Object.keys(propertiesMap)
      },
      validationChecks () {
        return {
          hasName: this.name !== '',
          nameIsUnique: !this.project.dataGroups
            .map(dataGroup => dataGroup.name)
            .includes(this.name),
          typing: this.typing === true,
          allPropertiesHaveNames: !this.properties.map(prop => prop.value).includes(''),
          propertiesHaveNames: !this.properties.filter(prop => !prop.new).map(prop => prop.value).includes(''),
          propertyNamesAreUnique: !this.nonUniqueProperties.length > 0
        }
      },
      errors () {
        let [name, properties] = [[], [], []]
        let check = this.validationChecks
        if (check.typing) {
          // name
          if (!check.hasName) { name.push('You must supply a name') }
          if (!check.nameIsUnique) { name.push('Name already exists') }
          // properties
          if (!check.propertiesHaveNames) { properties.push('All properties must be named') }
          if (!check.propertyNamesAreUnique) { properties.push(`Properties [${this.nonUniqueProperties.join('] [')}] are not unique`) }
        }
        return {
          name,
          properties
        }
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
</style>
