import Vue from 'vue'

export default {
  localStorage__addProject (state, payload) {
    localStorage[payload.id] = JSON.stringify(payload.project)
  },
  localStorage__updateProject (state, payload) {
    localStorage[payload.project.id] = JSON.stringify(payload.project)
  },
  localStorage__deleteProject (state, payload) {
    localStorage.removeItem(payload.id)
  },
  setActiveTab (state, payload) {
    state.active.tab = payload.tabName
  },
  addProject (state, payload) {
    Vue.set(state.projects, payload.id, payload)
  },
  renameProject (state, payload) {
    state.projects[payload.id].name = payload.name
    state.active.project.name = payload.name
  },
  setProjectData (state, project) {
    state.active.project = project
  },
  updateProjectData (state, project) {
    state.projects[project.id] = project
  },
  setProjects (state, payload) {
    state.projects = payload.projects
  },
  deleteProject (state, payload) {
    Vue.delete(state.projects, payload.id)
  },
  deleteAllProjects (state) {
    state.projects = {}
  },
  openModal (state, modalName) {
    state.active.modal = modalName
  },
  closeModal (state) {
    state.active.modal = null
  },
  setBreakpoint (state, breakpoint) {
    state.breakpoint = breakpoint
  }
}
