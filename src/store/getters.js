import template from '@/store/utility/templates'

export default {
  isNewUser (state, getters) {
    return getters.projectNames.length === 0
  },
  isReturningUser (state, getters) {
    return getters.projectNames.length !== 0
  },
  regex () {
    return {
      isProject: /^proj_/
    }
  },
  projectNames (state) {
    return state.projectIds
  },
  template () {
    return template
  }
}
