<template>
  <el-dialog
    title="rename project"
    :visible="showModal"
    width="300px"
    :close-on-click-modal="false"
    @close="closeModal()">

    <section class="section">
      <el-input v-model.trim="name.new" type="text" :class="{'has-errors': !validated && validationChecks.renamed}"/>
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
  import { mapState, mapGetters } from 'vuex'
  import { closeModal } from 'utils/mixins'

  export default {
    name: 'modal-rename-project',
    mixins: [closeModal],
    created () {
      this.name = {
        original: this.active.project.name,
        new: this.active.project.name
      }
    },
    beforeDestroy () {
      this.name = null
    },
    data () {
      return {
        mode: 'rename',
        name: null
      }
    },
    computed: {
      ...mapState([
        'active'
      ]),
      ...mapGetters([
        'projectNames'
      ]),

      showModal () {
        return this.active.modal === 'renameProject'
      },
      validationChecks () {
        return {
          hasName: this.name.new !== '',
          renamed: this.name.new !== this.name.original,
          nameIsUnique: !this.projectNames.includes(this.name.new)
        }
      },
      errors () {
        let errors = []
        let check = this.validationChecks
        if (check.renamed) {
          if (!check.hasName) { errors.push({ text: 'Your project name cannot be blank', type: 'warning' }) }
          if (!check.nameIsUnique) { errors.push({ text: 'Project name already exists', type: 'danger' }) }
        }
        return errors
      },
      validated () {
        return !Object.values(this.validationChecks).includes(false)
      }
    },
    methods: {
      renameProject () {
        if (this.validated) {
          this.$store.dispatch('RENAME_PROJECT', { name: this.name.new })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
