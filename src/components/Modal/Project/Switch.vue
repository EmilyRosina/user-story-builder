<template>
  <el-dialog
    title="switch project"
    :visible.sync="showModal"
    width="300px"
    :close-on-click-modal="false"
    @close="closeModal()">

    <section class="section">
      <el-select v-model="selectedProjectId">
        <el-option
          v-for="(project, key) in projectMap" :key="key"
          :label="project"
          :value="key"
          :hidden="key === selectedProjectId"/>
      </el-select>
    </section>
    <span slot="footer">
      <el-button plain @click="switchProject" type="success" :disabled="!validated" class="U--full-width">Switch project</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { closeModal } from 'utils/mixins'

  export default {
    name: 'modal-switch-project',
    mixins: [closeModal],
    created () {
      this.selectedProjectId = this.active.project.id
    },
    data () {
      return {
        mode: 'switch',
        selectedProjectId: ''
      }
    },
    computed: {
      ...mapState([
        'active',
        'projects'
      ]),
      ...mapGetters([
        'projectMap'
      ]),
      showModal () {
        return this.active.modal === 'switchProject'
      },
      validated () {
        return this.selectedProjectId !== this.active.project.id
      }
    },
    methods: {
      switchProject () {
        let project = this.projects[this.selectedProjectId]
        this.$store.commit('setProjectData', project)
        this.closeModal()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
