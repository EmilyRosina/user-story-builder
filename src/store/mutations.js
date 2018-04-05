export default {
  setActiveTab (state, payload) {
    state.activeTab = payload.tabName
  },
  setProjectData (state, payload) {
    state.active.project = payload.projectData
  },
  setProjectIds (state, payload) {
    state.projectIds = payload.projectIds
  }
}
