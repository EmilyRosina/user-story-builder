<template>
  <el-dialog
    title="add project"
    :visible.sync="showModal"
    width="300px"
    :close-on-click-modal="false"
    @close="closeModal()">

    <section class="section">
      <el-input v-model="name" type="text" :class="{'has-errors': !validated && typing}" @keydown.native.once="typing = true"/>
      <p class="errors">
        <el-tag v-for="(error, index) in errors" :key="index" :type="error.type">{{ error.text }}</el-tag>
      </p>
    </section>

    <span slot="footer">
      <el-button plain @click="addProject" type="success" :disabled="!validated" class="U--full-width">Add project</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { closeModal } from 'utils/mixins'

  export default {
    name: 'modal-add-project',
    mixins: [closeModal],
    data () {
      return {
        mode: 'add',
        name: '',
        typing: false
      }
    },
    computed: {
      ...mapState([
        'active',
        'template'
      ]),
      ...mapGetters([
        'projectNames'
      ]),
      showModal () {
        return this.active.modal === 'addProject'
      },
      validationChecks () {
        return {
          hasName: this.name !== '',
          isTyping: this.typing,
          nameIsUnique: !this.projectNames.includes(this.name)
        }
      },
      errors () {
        let errors = []
        let check = this.validationChecks
        if (check.isTyping) {
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
      addProject () {
        if (this.validated) {
          this.$store.dispatch('ADD_PROJECT', { name: this.name })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
