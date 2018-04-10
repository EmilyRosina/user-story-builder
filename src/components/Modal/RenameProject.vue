<template>
  <el-dialog
    v-if="showModal"
    title="add project"
    :visible.sync="showModal"
    width="300px"
    :close-on-click-modal="false"
    @close="closeModal()">

    <section class="section">
      <el-input v-model="options.rename.newName" type="text" :class="{'has-errors': !validated && validationChecks.renamed}"/>
      <p class="errors">
        <el-tag v-for="(error, index) in errors" :key="index" :type="error.type">{{ error.text }}</el-tag>
      </p>
    </section>
    <span slot="footer">
      <el-button plain @click="renameProject" type="success" :disabled="!validated" class="U--full-width">Save</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'modal-rename-project',
    data () {
      return {
        mode: 'rename'
      }
    },
    computed: {
      ...mapState([
        'active'
      ]),
      showModal () {
        return this.active.modal === 'renameProject'
      },
      validationChecks () {
        // switch (this.options.mode) {
        //   case 'rename':
        //     return {
        //       for: 'rename',
        //       hasName: this.options.rename.newName !== '',
        //       renamed: this.options.rename.newName !== this.active.project.name,
        //       nameIsUnique: !this.projectNames.includes(this.options.rename.newName)
        //     }
        //   case 'add':
        //     return {
        //       for: 'add',
        //       hasName: this.options.add.name !== '',
        //       isTyping: this.options.add.typing,
        //       nameIsUnique: this.projectNames.includes(this.options.add.name)
        //     }
        //   default:
        //     return {}
        // }
        return {}
      },
      errors () {
        let errors = []
        // let check = this.validationChecks
        // switch (this.options.mode) {
        //   case 'rename':
        //     if (check.renamed) {
        //       if (!check.hasName) { errors.push({ text: 'Your project name cannot be blank', type: 'warning' }) }
        //       if (!check.nameIsUnique) { errors.push({ text: 'Project name already exists', type: 'danger' }) }
        //     }
        //     break
        //   case 'add':
        //     if (check.isTyping) {
        //       if (!check.hasName) { errors.push({ text: 'Your project name cannot be blank', type: 'warning' }) }
        //       if (!check.nameIsUnique) { errors.push({ text: 'Project name already exists', type: 'danger' }) }
        //     }
        // }
        return errors
      },
      validated () {
        return !Object.values(this.validationChecks).includes(false)
      }
    },
    methods: {
      closeModal () {
        this.$store.commit('closeModal')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
