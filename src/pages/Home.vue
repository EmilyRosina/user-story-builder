<template>
  <main-layout class="home">
    <el-row>

      <el-col v-if="isReturningUser">
        <!-- <el-tag type="warning">Dashboard coming soon...</el-tag> -->
        <el-row v-if="project" style="padding-top: 2em;">
          <el-col :span="8">
            <span class="U--color-orange"><b>Total</b> Data Groups:</span>
            <span v-if="total.dataGroups">{{ total.dataGroups }}</span>
            <span v-else class="U--dull-if-null">none</span>
          </el-col>
          <el-col :span="8">
            <span class="U--color-orange"><b>Total</b> User Stories:</span>
            <span v-if="total.userStories">{{ total.userStories }}</span>
            <span v-else class="U--dull-if-null">none</span>
          </el-col>
          <el-col :span="8">
            <span class="U--color-orange"><b>Total</b> User Journeys:</span>
            <span v-if="total.userJourneys">{{ total.userJourneys }}</span>
            <span v-else class="U--dull-if-null">none</span>
          </el-col>
        </el-row>
      </el-col>

      <el-col v-if="isNewUser" class="setup" :sm="10" :md="8">
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
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'home',
    data () {
      return {
        newProjectName: '',
        typing: false
      }
    },
    mounted () {
      this.$store.commit('setActiveTab', 'home')
    },
    computed: {
      ...mapGetters([
        'projectNames',
        'isNewUser',
        'isReturningUser',
        'template',
        'project'
      ]),
      ...mapState([
        'projects'
      ]),

      total () {
        return {
          dataGroups: Object.keys(this.project.dataGroups).length,
          userStories: Object.keys(this.project.userStories).length,
          userJourneys: Object.keys(this.project.userJourneys).length
        }
      },
      validationChecks () {
        return {
          hasName: this.newProjectName !== '',
          nameIsUnique: !Object.values(this.projects)
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
        this.$store.dispatch('ADD_PROJECT', {
          name: this.newProjectName
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
