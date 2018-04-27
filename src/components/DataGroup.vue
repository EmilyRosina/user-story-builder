<template>
  <div class="data-group">

    <el-row @click.native="openOptions()">
      <el-row class="data-group__title-bar">
        <h2 class="data-group__name">{{ dataGroup.name }}</h2>
      </el-row>
      <el-tag :class="['data-group__property-length', {'data-group__property-length--none': Object.keys(dataGroup.properties).length === 0}]" :type="tagType" size="mini">{{ propertyLengthText }}</el-tag>
      <el-row class="data-group__property-list">
        <span v-for="property in dataGroup.properties" :key="property.key" class="property">{{ property.value}}</span>
      </el-row>
    </el-row>
    <div class="overlay" @click="closeOptions" v-if="showOptions"></div>
    <el-row class="options-overlay" type="flex" align="middle" v-if="showOptions">
      <div @click="editDataGroup()" :class="['options-overlay__edit', ifSelected('edit')]">
        <icon name="pencil-alt" scale="2"/>
      </div>
      <div @click="deleteDataGroup()" :class="['options-overlay__delete', ifSelected('delete')]">
        <icon v-if="selected !== 'delete'" name="trash" scale="2"/>
        <span v-else>Are you sure?</span>
      </div>
    </el-row>

    <modal-config-data-group mode="edit" v-if="modalShowing.editDataGroup && dataGroup.id === active.dataGroupId" :dataGroupData="dataGroup"></modal-config-data-group>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import ModalConfigDataGroup from '@/components/Modal/ConfigDataGroup'

  export default {
    name: 'data-group',
    props: {
      dataGroup: {
        type: Object,
        required: true
      }
    },
    components: {
      ModalConfigDataGroup
    },
    data () {
      return {
        showOptions: false,
        selected: null
      }
    },
    computed: {
      ...mapState([
        'active'
      ]),
      ...mapGetters([
        'project',
        'modalShowing'
      ]),

      propertyLengthText () {
        return this.propertiesLength === 0
          ? 'No properties'
          : this.propertiesLength === 1
            ? '1 property'
            : `${this.propertiesLength} properties`
      },
      tagType () {
        return this.propertiesLength === 0 ? 'info' : 'warning'
      },
      propertiesLength () {
        return Object.keys(this.dataGroup.properties).length
      }
    },
    methods: {
      openOptions () {
        this.showOptions = true
      },
      closeOptions () {
        this.showOptions = false
        this.selected = null
      },
      ifSelected (selection) {
        return { 'active': this.selected === selection }
      },
      editDataGroup () {
        this.closeOptions()
        this.$store.commit('setActiveDataGroupId', this.dataGroup.id)
        this.$store.commit('openModal', 'editDataGroup')
      },
      deleteDataGroup () {
        if (this.selected !== 'delete') this.selected = 'delete' // acts as a buffer
        else {
          let dataGroups = Object.assign({}, this.project.dataGroups)
          delete dataGroups[this.dataGroup.id]
          let project = Object.assign({}, this.project, { dataGroups })
          this.closeOptions()
          this.$store.dispatch('SET_PROJECT_DATA', project)
          this.$message({ message: `Deleted dataGroup ${this.dataGroup.name}`, type: 'success' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data-group {
    position: relative;
    overflow: hidden;
    margin-top: 2em;
    user-select: none;

    &__title-bar {
      background: darken($grey, 10%);
      padding: 1em;
    }

    &__name {
      color: $orange;
      margin: 0;
      text-align: left;
      word-wrap: break-word;
    }


    &__property-list {
      display: block;
      text-align: left;
      border-bottom-right-radius: 1em;
      margin: auto;
      font-size: 0.75rem;
      overflow: hidden;
      min-height: 2em;
      background: $grey-dark;
      padding: 0.5em;
      padding-right: 7.5em;

      .property {
        margin: 0 0.5em;
        color: #999;
      }
    }
    &__property-length {
      border-radius: 1em;
      padding-left: 0.5em;
      padding-right: 0.5em;
      position: absolute;
      z-index: 1;
      right: 2px;
      bottom: 2px;

      &--none {
        left: 2px;
        width: calc(100% - 4px);
        border: none;
        background: none;
        font-style: italic;
      }
    }

    .overlay {
      background: transparentize(black, 0.65);
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 1;
    }

    .options-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparentize(white, 0.55);
      z-index: 2;

      &__edit,
      &__delete {
        display: flex;
        flex: 1 0 0%;
        align-items: center;
        justify-content: center;
        color: #333;
        height: 100%;
        transition: 1s;
        cursor: pointer;
        user-select: none;

        &.active {
          flex-basis: 70%;
        }
      }

      &__edit {
        background: transparentize($orange, 0.3);
      }
      &__delete {
        background: transparentize($red, 0.3);
      }
    }
  }
</style>
