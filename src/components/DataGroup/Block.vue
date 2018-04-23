<template>
  <div class="data-group-block">
    <el-row type="flex" align="middle" @click.native="openOptions()">
      <h2 class="data-group-block__name">{{ dataGroup.name }}</h2>
      <el-tag class="data-group-block__property-length" :type="tagType" size="mini">{{ propertyLengthText }}</el-tag>
      <div class="data-group-block__property-list">
        <span v-for="property in dataGroup.properties" :key="property.key" class="property">{{ property.value}}</span>
      </div>
    </el-row>
    <div class="overlay" @click="closeOptions" v-if="showOptions"></div>
    <el-row class="options-overlay" type="flex" align="middle" v-if="showOptions">
      <div @click="editDataGroup()" :class="['options-overlay__edit', ifSelected('edit')]">Edit</div>
      <div @click="deleteDataGroup()" :class="['options-overlay__delete', ifSelected('delete')]">{{ selected === 'delete' ? 'Are you sure?' : 'Delete' }}</div>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'data-group-block',
    props: {
      index: {
        type: Number,
        required: true
      },
      dataGroup: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        showOptions: false,
        selected: null
      }
    },
    computed: {
      ...mapGetters([
        'project'
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
        return this.dataGroup.properties.length
      }
    },
    methods: {
      openOptions () {
        this.showOptions = true
        // this.$message({ message: `hi ${this.showOptions}` })
      },
      ifSelected (selection) {
        return { 'active': this.selected === selection }
      },
      closeOptions () {
        this.showOptions = false
        this.selected = null
        // this.$message({ message: `bye ${this.showOptions}` })
      },
      editDataGroup () {
        this.selected = 'edit'
        this.$message({ message: `Open edit dataGrop modal -- index ${this.index} --  dataGroup ${this.dataGroup.name}` })
      },
      deleteDataGroup (dataGroup, index) {
        if (this.selected !== 'delete') this.selected = 'delete' // acts as a buffer
        else {
          let project = Object.assign({}, this.project, { dataGroups: this.project.dataGroups.filter(dg => dg.id !== this.dataGroup.id) })
          this.$store.dispatch('SET_PROJECT_DATA', project)
          this.$message({ message: `Deleted dataGroup ${this.dataGroup.name}`, type: 'success' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data-group-block {
    position: relative;
    overflow: hidden;
    background: darken($grey, 10%);
    padding: 1em;
    margin-top: 2em;

    &__property-list {
      display: block;
      text-align: right;
      width: 100%;
      font-size: 0.75rem;
      overflow: hidden;

      .property {
        margin: 0 0.5em;
      }
    }
    &__property-length {
      border-radius: 1em;
      margin-left: 1em;
      padding-left: 0.5em;
      padding-right: 0.5em;
    }
    &__name {
      color: $orange;
      margin: 0;
      text-align: left;
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
