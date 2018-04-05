export default {
  GET_PROJECT_IDS (context) {
    const projectIds = Object.keys(localStorage).filter(key => {
      return context.getters.regex.isProject.test(key)
    })
    context.commit('setProjectIds', { projectIds })
  },
  GET_PROJECT_DATA (context, payload) {
    let projectData = JSON.parse(localStorage[payload.projectId])
    context.commit('setProjectData', { projectData })
  }
}
