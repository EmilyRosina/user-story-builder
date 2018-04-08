import Vue from 'vue'

export default {
  setActiveTab (state, payload) {
    state.active.tab = payload.tabName
  },
  addProject (state, payload) {
    Vue.set(state.projects, payload.id, payload)
  },
  setProjectData (state, payload) {
    state.active.project = payload.project
  },
  setProjects (state, payload) {
    state.projects = payload.projects
  },
  deleteAllProjects (state) {
    state.projects = {}
  }
}
