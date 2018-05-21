<template>
  <div class="project-bar">
    <h4 class="project-name">{{ project ? project.name : '' }}</h4>
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
        'modalShowing',
        'project'
      ]),
      showOptions () {
        return this.options.mode !== null
      }
    },
    methods: {
      openModal (modalName) {
        this.$store.commit('openModal', modalName)
      },
      deleteProject () {
        this.$confirm(
          'Are you sure you want to delete this project?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          })
          .then(() => {
            this.$store.dispatch('DELETE_PROJECT', this.project.id)
          })
          .catch((err) => {
            return err !== 'cancel' ? console.error(err) : null
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
