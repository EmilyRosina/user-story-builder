export default {
  GET_PROJECTS (context) {
    let projects = {}
    Object.keys(localStorage)
      .filter(key => { return context.getters.regex.isProject.test(key) })
      .forEach(key => { projects[key] = JSON.parse(localStorage[key]) })
    context.commit('setProjects', { projects })
  },
  ADD_PROJECT (context, payload) {
    // add project to localStorage (id, name, data)
    localStorage[payload.id] = JSON.stringify(payload.project)
    // add project to store (id: name)
    context.commit('addProject', {
      id: payload.id,
      name: payload.project.name
    })
    // add project to store.state.active.project
    context.commit('setProjectData', {
      id: payload.id,
      project: payload.project
    })
  },
  GET_PROJECT_DATA (context, payload) {
    let projectData = JSON.parse(localStorage[payload.projectId])
    context.commit('setProjectData', {
      project: Object.assign({}, { id: payload.id }, projectData)
    })
  }
}
