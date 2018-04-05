export default {
  setActiveTab (state, payload) {
    state.active.tab = payload.tabName
  },
  setProjectData (state, payload) {
    state.active.project = payload.projectData
  },
  setProjectIds (state, payload) {
    state.projectIds = payload.projectIds
  }
}
