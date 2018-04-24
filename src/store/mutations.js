import Vue from 'vue'

export default {
  localStorage__addProject (state, project) {
    localStorage[project.id] = JSON.stringify(project)
  },
  localStorage__updateProject (state, project) {
    localStorage[project.id] = JSON.stringify(project)
  },
  localStorage__deleteProject (state, projectId) {
    localStorage.removeItem(projectId)
  },
  setActiveDataGroupId (state, dataGroupId) {
    state.active.dataGroupId = dataGroupId
  },
  setActiveProjectId (state, projectId) {
    state.active.projectId = projectId
  },
  setActiveTab (state, tabName) {
    state.active.tab = tabName
  },
  addProject (state, project) {
    Vue.set(state.projects, project.id, project)
  },
  renameProject (state, project) {
    state.projects[project.id].name = project.name
  },
  updateProjectData (state, project) {
    state.projects[project.id] = project
  },
  setProjects (state, projects) {
    state.projects = projects
  },
  deleteProject (state, projectId) {
    Vue.delete(state.projects, projectId)
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
