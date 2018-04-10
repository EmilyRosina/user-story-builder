export default {
  GET_PROJECTS (context) {
    let projects = {}
    Object.keys(localStorage)
      .filter(key => { return context.getters.regex.isProject.test(key) })
      .forEach(key => { projects[key] = JSON.parse(localStorage[key]) })
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

  // payload: { id, name }
  RENAME_PROJECT (context, payload) {
    const projectId = context.state.active.project.id
    const project = {
      name: payload.name,
      dataGroups: context.state.active.project.dataGroups,
      userStories: context.state.active.project.userStories,
      userJourneys: context.state.active.project.userJourneys
    }
    context.commit('localStorage__updateProject', { id: projectId, project })
    context.commit('renameProject', payload.name)
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
        context.commit('setProjectData', context.state.projects[firstProjectId])
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
