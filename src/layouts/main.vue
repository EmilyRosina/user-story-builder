<template>
  <el-container class="main-layout">

    <el-header>
      <p>User Story Builder</p>
      <div class="project-bar" v-if="!isNewUser">
        <el-input value="Project 1" class="project-bar__name" />
        <icon name="cog" class="project-bar__icon"></icon>
      </div>
    </el-header>

    <el-main>
      <template v-if="!isNewUser">
        <div class="button-bar">
          <button
            :class="['button-bar__button', {'active': tabIsActive(tab.name)}]"
            v-for="tab in tabs" :key="tab.name"
            @click="handleTabClick(tab.name)">
              {{ tab.label }}
          </button>
        </div>
        <slot></slot>
      </template>
      <template v-else>
        <h1>Hi Newbie!</h1>
        <slot></slot>
      </template>
    </el-main>


    <el-footer>EmilyRosina &copy; {{ thisYear }}</el-footer>

  </el-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'main-layout',
    created () {
      if (window.localStorage.projectNames) {
        this.$store.commit('set_new_user', false)
      }
    },
    data () {
      return {
        tabs: [
          {
            name: 'dataGroups',
            label: 'Data Groups'
          },
          {
            name: 'userStories',
            label: 'User Stories'
          },
          {
            name: 'userJourney',
            label: 'User Journey'
          }
        ]
      }
    },
    methods: {
      handleTabClick (selectedTab) {
        this.$store.commit('setActiveTab', { tabName: selectedTab })
        this.$router.push({ name: selectedTab })
      },
      tabIsActive (tabName) {
        return tabName === this.activeTab
      }
    },
    computed: {
      ...mapGetters([
        'isNewUser'
      ]),
      thisYear () {
        /* eslint-disable no-new */
        return (new Date()).getFullYear()
      },
      activeTab () {
        return this.$store.state.activeTab
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-header {
    @extend %flex--center--cross;
    @extend %flex--no-wrap;
    justify-content: space-between;
    background: #111;
    color: gold;
    .project-bar {
      @extend %flex--center--cross;
      position: relative;
      &__name {
        width: initial;
        input.el-input__inner {
          padding-right: 3em;
        }
      }
      &__icon {
        position: absolute;
        right: 1em;
      }
    }

  }

  .button-bar {
    &__button {
      padding: 1em;
      background: #111;
      color: #eee;
      border-bottom: 3px solid transparent;
      transition: 0.5s ease;
      @extend %reset--button;

      &:active,
      &:hover,
      &.active {
        border-color: $orange;
      }
    }
  }

  .el-main {
    background: #444;
    color: white;
  }
  .el-footer {
    @extend %flex--center;
    background: #222;
    color: lightseagreen;
  }
</style>
