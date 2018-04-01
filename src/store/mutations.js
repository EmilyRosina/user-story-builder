export default {
  setActiveTab (state, payload) {
    state.activeTab = payload.tabName
  },
  switchProject (state, payload) {
    state.projectName = payload.name
  },
  addNewProject (state, payload) {
    state.projectNames.push(payload.name)
  },
  setProjectData (state, payload) {

  },
  setProjectNames (state, payload) {

  }
}
