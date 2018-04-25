<template>
  <el-dialog
    title="edit data group"
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
            <el-input v-model.trim="name" class="centered"></el-input>
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
              <input
                placeholder=""
                v-model.trim="property.value"
                @keydown.once.native="startTyping(property.key)"
                :class="['property-input', 'el-input', {'has-errors': !validationChecks.nameIsUnique || !validationChecks.hasName}]" />
              <el-button-group class="joint-input">
                <el-button @click="removeProperty(index)" type="warning" plain class="remove">
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
              <el-button type="warning" plain @click.native="addProperty()" class="U--full-width">Add Property</el-button>
            </el-row>
          </template>

          <el-tag v-for="(error, index) in errors.properties" :key="`property_error_${index}`" type="danger">{{ error }}</el-tag>
        </el-col>
      </el-row>
    </span>

    <span slot="footer">
      <el-button plain @click="saveDataGroup" type="success" :disabled="!validated" class="U--full-width">Save changes</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import { closeModal, addEditDataGroup } from 'utils/mixins'
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'modal-edit-data-group',
    mixins: [closeModal, addEditDataGroup],
    data () {
      return {
        id: this.dataGroup.id,
        name: this.dataGroup.name,
        properties: this.dataGroup.properties,
        typing: true
      }
    },
    methods: {
      ...mapActions([
        'SET_PROJECT_DATA'
      ]),

      saveDataGroup () {
        this.$message({message: `save this shit`})
        // let dataGroups = Object.assign({}, this.project.dataGroups,
        // dataGroups[this.index] = Object.assign({}, this.dataGroup, { name: this.name, properties: this.properties })
        // let project = Object.assign({}, this.project, { dataGroups })
        // this.SET_PROJECT_DATA(project)
        // this.closeModal('dataGroupId')
      }
    },
    computed: {
      ...mapState([
        'active'
      ]),
      ...mapGetters([
        'project',
        'dataGroup',
        'breakpointIs'
      ]),

      showModal () {
        return this.active.modal === 'editDataGroup'
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
