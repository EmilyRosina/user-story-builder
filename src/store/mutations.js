import Vue from 'vue'

export default {
  localStorage__updateProject (state, payload) {
    localStorage[payload.id] = JSON.stringify(payload.project)
  },
  setActiveTab (state, payload) {
    state.active.tab = payload.tabName
  },
  addProject (state, payload) {
    Vue.set(state.projects, payload.id, payload)
  },
  renameProject (state, payload) {
    state.active.project.name = payload
  },
  setProjectData (state, payload) {
    state.active.project = payload
  },
  setProjects (state, payload) {
    state.projects = payload.projects
  },
  deleteAllProjects (state) {
    state.projects = {}
  }
}
