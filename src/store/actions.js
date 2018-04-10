export default {
  GET_PROJECTS (context) {
    let projects = {}
    Object.keys(localStorage)
      .filter(key => { return context.getters.regex.isProject.test(key) })
      .forEach(key => { projects[key] = Object.assign(JSON.parse(localStorage[key]), { id: key }) })
    context.commit('setProjects', { projects })
  },

  // payload: { name }
  ADD_PROJECT (context, payload) {
    const id = `proj_${Date.now()}`
    const name = payload.name
    let project = Object.assign({}, context.getters.template.project, { name })
    return new Promise((resolve) => {
      context.commit('localStorage__addProject', { id, project })
      if (localStorage[id]) { resolve() }
    })
    .then(() => {
      context.commit('addProject', Object.assign({}, project, { id }))
      return context.getters.projectIds.includes(id)
    })
    .then((stillOk) => {
      if (stillOk) {
        context.commit('setProjectData', Object.assign({}, project, { id }))
      }
    })
  },

  // payload: { name }
  RENAME_PROJECT (context, payload) {
    const id = context.state.active.project.id
    const name = payload.name
    let project = Object.assign({}, context.state.active.project, { name })
    delete project.id
    return new Promise((resolve) => {
      context.commit('localStorage__updateProject', { id, project })
      if (JSON.parse(localStorage[id]).name === name) { resolve() }
    })
    .then(() => {
      context.commit('renameProject', { name, id })
    })
  },

  DELETE_PROJECT (context, payload) {
    const id = payload.id
    return new Promise((resolve) => {
      context.commit('localStorage__deleteProject', { id })
      if (!localStorage[id]) { resolve() }
    })
    .then(() => {
      context.commit('deleteProject', { id })
      return !context.getters.projectIds.includes(id)
    })
    .then((stillOk) => {
      if (stillOk) {
        const firstProjectId = context.getters.projectIds[0]
        const firstProject = Object.assign({}, context.state.projects[firstProjectId], { id: firstProjectId })
        context.commit('setProjectData', firstProject)
      }
    })
  },

  DELETE_ALL_PROJECTS (context) {
    context.getters.projectIds.forEach(projectId => {
      context.commit('localStorage__deleteProject', { id: projectId })
    })
    context.commit('deleteAllProjects')
  },

  // payload: { id, name }
  GET_PROJECT_DATA (context, payload) {
    let project = JSON.parse(localStorage[payload.id])
    context.commit('setProjectData', Object.assign({}, { id: payload.id }, project))
  }
}
