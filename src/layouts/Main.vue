<template>
  <el-container class="main-layout">

    <span v-if="devMode" :class="`breakpoint--${breakpoint}`">{{ breakpoint }}</span>

    <el-header>
      <router-link tag="p" to="/" :class="['title', {'centered-title': isNewUser}]">
        <icon v-if="breakpointIs('xs') && isReturningUser" name="home" scale="1.5"/>
        <span v-else>{{ title }}</span>
      </router-link>

      <project-bar v-if="isReturningUser"></project-bar>

    </el-header>

    <el-main>

      <template v-if="isReturningUser">
        <div class="button-bar">
          <button
            :class="['button-bar__button', {active: tabIsActive(tab.name)}]"
            v-for="tab in tabs"
            :key="tab.name"
            @click="handleTabClick(tab.name)"
            >
            {{ tab.label }}
          </button>
        </div>
        <slot></slot>
      </template>

      <template v-if="isNewUser">
        <h1>Welcome!</h1>
        <slot></slot>
      </template>

    </el-main>


    <el-footer>EmilyRosina &copy; {{ thisYear }}</el-footer>

  </el-container>
</template>

<script>
  import ProjectBar from '@/components/ProjectBar'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'main-layout',
    components: {
      ProjectBar
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
            name: 'userJourneys',
            label: 'User Journeys'
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
        return tabName === this.active.tab
      }
    },
    computed: {
      ...mapGetters([
        'isNewUser',
        'isReturningUser',
        'breakpointIs',
        'devMode'
      ]),
      ...mapState([
        'active',
        'breakpoint'
      ]),
      thisYear () {
        /* eslint-disable no-new */
        return new Date().getFullYear()
      },
      title () {
        return 'User Story Builder'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .breakpoint {
    position: absolute;
    color: black;
    padding: 0.15em;
    top: 0;
    left: 0;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 800;
    &--xs { @extend .breakpoint; background: skyblue }
    &--sm { @extend .breakpoint; background: lightgreen }
    &--md { @extend .breakpoint; background: lightsalmon }
    &--lg { @extend .breakpoint; background: lightcoral }
    &--xl { @extend .breakpoint; background: violet }
  }

  .centered-title {
    text-align: center;
    width: 100%;
  }

  .el-header {
    @extend %flex--center--cross;
    @extend %flex--no-wrap;
    justify-content: space-between;
    background: #111;
    color: gold;
    .title {
      cursor: pointer;
    }
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
    margin-bottom: 2em;
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
