<template>
  <div class="project-bar">
    <h4 class="project-name">{{ active.project.name }}</h4>
    <el-button type="info" plain icon="el-icon-more" circle size="mini" class="icon--info" @click="openOptions"></el-button>
    <el-button type="danger" plain icon="el-icon-delete" circle size="mini" class="icon--delete" @click="deleteAllProjectsBuffer"></el-button>

    <el-dialog
      title="Project options"
      :visible.sync="options.show"
      width="300px">
      <section class="section">
        <h4 class="section__title">Rename Project</h4>
        <el-input v-model="options.newName" type="text" :class="{'has-errors': !validated && validationChecks.renamed}"/>
        <p class="errors">
          <el-tag v-for="(error, index) in errors" :key="index" :type="error.type">{{ error.text }}</el-tag>
        </p>
      </section>
      <span slot="footer">
        <!-- <el-button @click="closeOptions" plain type="danger" class="cancel">Cancel</el-button> -->
        <el-button plain @click="renameProject" type="success" :disabled="!validated" class="U--full-width">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'project-bar',
    data () {
      return {
        options: {
          show: false,
          newName: ''
        }
      }
    },
    computed: {
      ...mapState([
        'active',
        'projects'
      ]),
      validationChecks () {
        return {
          hasName: this.options.newName !== '',
          renamed: this.options.newName !== this.active.project.name,
          nameIsUnique: !Object.values(this.projects)
            .includes(this.options.newName)
        }
      },
      errors () {
        let errors = []
        let check = this.validationChecks
        if (!check.hasName) { errors.push({ text: 'Your project name cannot be blank', type: 'warning' }) }
        if (!check.nameIsUnique) { errors.push({ text: 'Project name already exists', type: 'danger' }) }
        return errors
      },
      validated () {
        return !Object.values(this.validationChecks).includes(false)
      }
    },
    methods: {
      openOptions () {
        this.options.newName = this.active.project.name
        this.options.show = true
      },
      closeOptions () {
        this.options.show = false
      },
      deleteAllProjectsBuffer () {
        this.$confirm(
          'Are you sure you want to delete all of your projects?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          })
          .then(this.deleteAllProjects)
          .catch(() => {
          })
      },
      deleteAllProjects () {
        this.$store.getters.projectIds.forEach(projectId => {
          localStorage.removeItem(projectId)
        })
        this.$store.commit('deleteAllProjects')
        this.$router.push({ name: 'home' })
      },
      renameProject () {
        this.options.show = false
        this.$message(`this is ready to go! Rename ${this.active.project.name} to ${this.options.newName}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .project-name {
    margin-right: 1em;
    text-align: right;
  }

  %icon__shared-styles {
    padding: 0.65em;
    background: none;
  }
  .icon {
    &--delete {
      @extend %icon__shared-styles;
      $clr: transparentize($red, 0.5);
      border: 2px solid $clr;
      color: $clr;
      margin-left: 0.25em;
    }
    &--info {
      @extend %icon__shared-styles;
      $clr: transparentize(#999, 0.5);
      border: 2px solid $clr;
      color: $clr;
    }

  }
</style>
