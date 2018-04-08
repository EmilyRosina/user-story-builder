<template>
  <div class="project-bar">
    <!-- <el-input value="Project 1" class="project-bar__name" /> -->
    <h4 class="project-name">{{ active.project.name }}</h4>
    <el-button type="info" plain icon="el-icon-more" circle size="mini" class="icon--info" @click="openOptions"></el-button>
    <el-button type="danger" plain icon="el-icon-delete" circle size="mini" class="icon--delete" @click="deleteAllProjectsBuffer"></el-button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'project-bar',
    data () {
      return {
        options: {
          hover: false,
          show: false
        }
      }
    },
    computed: {
      ...mapState([
        'active'
      ])
    },
    methods: {
      openOptions (msg) {
        console.log('hi!', msg)
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
