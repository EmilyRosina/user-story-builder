import template from '@/store/utility/templates'

export default {
  isNewUser (state) {
    return Object.keys(state.projects).length === 0
  },
  isReturningUser (state, getters) {
    return !getters.isNewUser
  },
  regex () {
    return {
      isProject: /^proj_/
    }
  },
  projectIds (state) {
    return Object.keys(state.projects)
  },
  projectNames (state, getters) {
    return getters.projectIds.map(projectId => {
      return state.projects[projectId].name
    })
  },
  template () {
    return template
  }
  // selected (state, getters) {
  //   let has = {
  //     projects: getters.isReturningUser,
  //     dataGroups: state.active.project.dataGroups.length > 0
  //   }
  //   return {
  //     // dataGroup: has.dataGroups // ? state.active.project.dataGroups[state.active.dataGroupIndex] : null
  //   }
  // }
}
