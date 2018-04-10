<template>
  <div class="project-bar">
    <h4 class="project-name">{{ active.project.name }}</h4>
    <el-button type="info" plain icon="el-icon-more" circle size="mini" class="icon--info" v-popover:options></el-button>

    <el-popover trigger="hover" ref="options" placement="bottom-end" :visible-arrow="false" popper-class="options">
      <el-menu>
        <el-menu-item-group title="Project options">
          <el-menu-item index="rename_project" @click="openModal('renameProject')">Rename <icon name="pencil-alt" /></el-menu-item>
          <el-menu-item index="switch_project" @click="openModal('switchProject')" v-if="hasMultipleProjects">Switch <icon name="sign-in-alt" /></el-menu-item>
          <el-menu-item index="delete_project" class="danger" @click="deleteProject()">Delete <icon name="trash-alt" /></el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="App options">
          <el-menu-item index="add_project" @click="openModal('addProject')" class="success">Add new project <icon name="plus" /></el-menu-item>
          <el-menu-item  index="delete_all_projects" class="danger" @click="deleteAllProjects()">Delete all projects <icon name="trash-alt" /></el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-popover>

    <modal-add-project v-if="modalShowing.addProject"></modal-add-project>
    <modal-switch-project v-if="modalShowing.switchProject"></modal-switch-project>
    <modal-rename-project v-if="modalShowing.renameProject"></modal-rename-project>

    <!-- <el-dialog
      v-if="['rename','switch','add'].includes(options.mode)"
      :title="`${options.mode} project`"
      :visible.sync="options.show"
      width="300px"
      :close-on-click-modal="false"
      @close="closeOptions()">

      <template v-if="modeIs('rename')">
        <section class="section">
          <el-input v-model="options.rename.newName" type="text" :class="{'has-errors': !validated && validationChecks.renamed}"/>
          <p class="errors">
            <el-tag v-for="(error, index) in errors" :key="index" :type="error.type">{{ error.text }}</el-tag>
          </p>
        </section>
        <span slot="footer">
          <el-button plain @click="renameProject" type="success" :disabled="!validated" class="U--full-width">Save</el-button>
        </span>
      </template>

      <template v-if="modeIs('switch')">
        <section class="section">

        </section>
        <span slot="footer">
          <el-button plain @click="switchProject" type="success" :disabled="!validated" class="U--full-width">Switch project</el-button>
        </span>
      </template>

      <template v-if="modeIs('add')">
        <section class="section">
          <el-input v-model="options.add.name" type="text" :class="{'has-errors': !validated && options.add.typing}" @keydown.native.once="options.add.typing = true"/>
          <p class="errors">
            <el-tag v-for="(error, index) in errors" :key="index" :type="error.type">{{ error.text }}</el-tag>
          </p>
        </section>
        <span slot="footer">
          <el-button plain @click="addProject" type="success" :disabled="!validated" class="U--full-width">Add project</el-button>
        </span>
      </template>

    </el-dialog> -->

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import ModalAddProject from '@/components/Modal/AddProject'
  import ModalSwitchProject from '@/components/Modal/SwitchProject'
  import ModalRenameProject from '@/components/Modal/RenameProject'

  export default {
    name: 'project-bar',
    components: {
      ModalAddProject,
      ModalSwitchProject,
      ModalRenameProject
    },
    data () {
      return {
        options: {
          mode: null,
          show: false
        }
      }
    },
    computed: {
      ...mapState([
        'active',
        'projects'
      ]),
      ...mapGetters([
        'hasMultipleProjects',
        'projectNames',
        'modalShowing'
      ]),
      showOptions () {
        return this.options.mode !== null
      }
    },
    methods: {
      openModal (modalName) {
        this.$store.commit('openModal', modalName)
      },
      // closeOptions () {
      //   const mode = this.options.mode
      //   this.options.show = false
      //   // to allow for el-dialog to finish close transition
      //   setTimeout(() => {
      //     this.options.mode = null
      //     delete this.options[mode]
      //   }, 300)
      // },
      deleteProject () {
        this.$confirm(
          'Are you sure you want to delete this project?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          })
          .then(() => {
            this.$store.dispatch('DELETE_PROJECT', { id: this.active.project.id })
          })
      },
      deleteAllProjects () {
        this.$confirm(
          'Are you sure you want to delete all of your projects?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          })
          .then(() => {
            this.$store.dispatch('DELETE_ALL_PROJECTS')
            this.$router.push({ name: 'home' })
          })
          .catch(() => {
          })
      },
      renameProject () {
        const oldName = this.active.project.name
        this.$store.dispatch('RENAME_PROJECT', {
          name: this.options.newName
        })
        .then(() => {
          this.closeOptions()
          this.$message({
            message: `Renamed ${oldName} to ${this.options.newName}`,
            type: 'success'
          })
        })
      },
      switchProject () {

      },
      addProject () {

      },
      modeIs (mode) {
        return mode === this.options.mode
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

  .options {
    .fa-icon {
      padding-left: 1em;
    }
  }
</style>
