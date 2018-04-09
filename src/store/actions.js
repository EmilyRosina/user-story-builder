export default {
  GET_PROJECTS (context) {
    let projects = {}
    Object.keys(localStorage)
      .filter(key => { return context.getters.regex.isProject.test(key) })
      .forEach(key => { projects[key] = JSON.parse(localStorage[key]) })
    context.commit('setProjects', { projects })
  },

  // payload: { id, name }
  ADD_PROJECT (context, payload) {
    context.commit('localStorage__updateProject', payload)
    let project = Object.assign({}, { id: payload.id }, payload.project)
    console.log(project)
    context.commit('addProject', Object.assign({}, project))
    context.commit('setProjectData', Object.assign({}, project))
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

  // payload: { id, name }
  GET_PROJECT_DATA (context, payload) {
    let project = JSON.parse(localStorage[payload.id])
    context.commit('setProjectData', Object.assign({}, { id: payload.id }, project))
  }
}
