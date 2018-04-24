import templates from 'utils/templates'

export default {
  devMode () {
    return process.env.NODE_ENV === 'development'
  },
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
  hasMultipleProjects (state, getters) {
    return Object.keys(state.projects).length > 1
  },
  dataGroup (state, getters) {
    return state.active.dataGroupId ? getters.project.dataGroups[state.active.dataGroupId] : null
  },
  project (state) {
    return state.projects[state.active.projectId]
  },
  projectIds (state) {
    return Object.keys(state.projects)
  },
  projectNames (state, getters) {
    return getters.projectIds.map(projectId => state.projects[projectId].name)
  },
  projectMap (state, getters) {
    let projects = {}
    getters.projectIds.map(projectId => { projects[projectId] = state.projects[projectId].name })
    return projects
  },
  template () {
    return templates
  },
  modalShowing (state) {
    const isOpen = (modalName) => state.active.modal === modalName
    return {
      addProject: isOpen('addProject'),
      switchProject: isOpen('switchProject'),
      renameProject: isOpen('renameProject'),
      addDataGroup: isOpen('addDataGroup'),
      editDataGroup: isOpen('editDataGroup')
    }
  },

  /**
   * @param {String} breakpoint String
   */
  breakpointIs: (state) => (...breakpoints) => {
    return breakpoints.includes(state.breakpoint)
  }
}
