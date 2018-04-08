<template>
  <main-layout class="home">
    <el-row>

      <el-col v-if="isReturningUser">
        <el-tag type="warning">Dashboard coming soon...</el-tag>
      </el-col>

      <el-col class="setup" v-if="isNewUser" :sm="10" :md="8">
        <h3>To get started, simply choose a name for your first project:</h3>
        <div class="add-new-project">
          <el-input
            v-model="newProjectName"
            @blur="typing = true"
            @keydown.native.once="typing = true"
            class="project-name__input">
          </el-input>
          <p class="project-name__errors">
            <el-tag :type="error.type" size="mini" v-for="(error, index) in errors" :key="index">{{ error.text }}</el-tag>
          </p>
          <el-button type="warning" @click="addProject" :disabled="!validated">Create</el-button>
        </div>
      </el-col>

    </el-row>
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
      validationChecks () {
        return {
          hasName: this.newProjectName !== '',
          nameIsUnique: !Object.values(this.$store.state.projects)
            .includes(this.newProjectName),
          typing: this.typing
        }
      },
      errors () {
        let errors = []
        let check = this.validationChecks
        if (check.typing) {
          if (!check.hasName) { errors.push({ text: 'You need to enter a name for your project to continue', type: 'warning' }) }
          if (!check.nameIsUnique) { errors.push({ text: 'Project name already exists', type: 'danger' }) }
        }
        return errors
      },
      validated () {
        return !Object.values(this.validationChecks).includes(false)
      }
    },
    methods: {
      addProject () {
        const id = `proj_${Date.now()}`
        let project = Object.assign({}, this.template.project, { name: this.newProjectName })
        this.$store.dispatch('ADD_PROJECT', {
          id,
          project
        })
        this.$notify({
          title: 'Project',
          message: 'added',
          type: 'success',
          showClose: false,
          duration: 1500,
          position: 'bottom-right'
        })
        this.reset()
      },
      reset () {
        this.newProjectName = ''
        this.typing = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setup {
    float: unset;
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
