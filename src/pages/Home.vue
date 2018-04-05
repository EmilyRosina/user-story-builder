<template>
  <main-layout class="home">

    <div v-if="isReturningUser">
      <el-tag type="warning">Dashboard coming soon...</el-tag>
    </div>

    <div class="setup" v-if="isNewUser">
      <h3>To get started, simply choose a name for your first project:</h3>
      <div class="add-new-project">
        <el-input
          v-model="newProjectName"
          @keydown.native.once="typing = true"
          class="project-name__input">
        </el-input>
        <p class="project-name__errors">
          <el-tag :type="error.type" size="mini" v-for="(error, index) in errors" :key="index">{{ error.text }}</el-tag>
        </p>
        <el-button type="warning" class="" @click="addProject">Create</el-button>
      </div>
    </div>

  </main-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'home',
    data () {
      return {
        newProjectName: '',
        typing: false
      }
    },
    computed: {
      ...mapGetters([
        'projectNames',
        'isNewUser',
        'isReturningUser',
        'template'
      ]),
      errors () {
        let errors = []
        let npn = this.newProjectName
        if (this.typing) {
          if (npn.length > 0 && this.projectNames.includes(npn)) { errors.push({ text: 'Project name already exists', type: 'danger' }) }
          if (npn.length === 0) { errors.push({ text: 'You need to enter a name for your project to continue', type: 'warning' }) }
        }
        return errors
      },
      hasErrors () {
        return this.errors.length > 0
      }
    },
    methods: {
      addProject () {
        const id = `proj_${Date.now()}`
        let project = this.template.project
        project.name = this.newProjectName
        localStorage[id] = JSON.stringify(project)
        this.$notify({
          title: 'Project',
          message: 'added',
          type: 'success',
          showClose: false,
          duration: 1500
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setup {
    width: 400px;
    margin: auto;
  }
  .add-new-project {
    .project-name {
      &__input {

      }
      &__errors {
        height: 1.5em;
        margin: 0.35em 0;
      }
    }
  }
</style>
