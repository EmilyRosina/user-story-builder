// eslint-disable-next-line
import { Message, Notification } from 'element-ui'
// http://element.eleme.io/#/en-US/component/notification
// http://element.eleme.io/#/en-US/component/message

export default {
  GET_PROJECTS (context) {
    let projects = {}
    Object.keys(localStorage)
      .filter(key => context.getters.regex.isProject.test(key))
      .forEach(key => { projects[key] = Object.assign(JSON.parse(localStorage[key]), { id: key }) })
    context.commit('setProjects', projects)
  },

  /**
   *
   * @param {Object} payload
   */
  GET_PROJECT_DATA (context, payload) {
    let project = JSON.parse(localStorage[payload.id])
    context.commit('updateProjectData', Object.assign({}, project))
  },

  /**
   *
   * @param {Object} project
   */
  SET_PROJECT_DATA (context, project) {
    context.commit('localStorage__updateProject', project)
    context.commit('updateProjectData', project)
    if (project.id !== context.getters.project.id) context.commit('setActiveProjectId', project.id)
  },

  /**
   *
   * @param {Object} payload { name: String }
   */
  ADD_PROJECT (context, payload) {
    const id = `proj_${Date.now()}`
    const name = payload.name
    let project = Object.assign({}, context.getters.template.project, { name, id })
    return new Promise((resolve) => {
      context.commit('localStorage__addProject', project)
      if (localStorage[id]) { resolve() }
    })
      .then(() => {
        context.commit('addProject', Object.assign({}, project))
        context.commit('setActiveProjectId', id)
        return context.state.active.projectId === id
      })
      .then((stillOk) => {
        if (stillOk) {
          Notification.success({
            title: `New project added`,
            dangerouslyUseHTMLString: true,
            message: `Successfully added project <b>${name}</b>`,
            type: 'success',
            showClose: false,
            duration: 3000,
            position: 'bottom-right'
          })
          context.commit('closeModal')
        }
      })
  },

  /**
   *
   * @param {Object} payload { name: String }
   */
  RENAME_PROJECT (context, project) {
    const origName = context.getters.project.name
    return new Promise((resolve) => {
      context.commit('localStorage__updateProject', project)
      if (JSON.parse(localStorage[project.id]).name === project.name) resolve()
    })
      .then(() => {
        context.commit('renameProject', project)
        return project.name === context.getters.project.name
      })
      .then((stillOk) => {
        if (stillOk) {
          context.commit('closeModal')
          Notification.success({
            title: `Rename successful`,
            message: `Successfully renamed <b>${origName}</b> to <b>${project.name}</b>`,
            dangerouslyUseHTMLString: true,
            type: 'success',
            showClose: false,
            duration: 3000,
            position: 'bottom-right'
          })
        }
      })
  },

  /**
   *
   * @param {Object} payload { id: String }
   */
  DELETE_PROJECT (context, projectId) {
    const name = context.getters.projectMap[projectId]
    return new Promise((resolve) => {
      context.commit('localStorage__deleteProject', projectId)
      if (!localStorage[projectId]) { resolve() }
    })
      .then(() => {
        context.commit('deleteProject', projectId)
        return !context.getters.projectIds.includes(projectId)
      })
      .then((stillOk) => {
        if (stillOk && context.getters.isReturningUser) {
          const firstProjectId = context.getters.projectIds[0]
          context.commit('setActiveProjectId', firstProjectId)
          return context.getters.projectId === firstProjectId
        }
        if (stillOk && context.getters.isNewUser) {
          context.commit('setActiveProjectId', null)
          return true
        }
      })
      .then((stillOk) => {
        Notification.success({
          title: `Deletion successful`,
          message: `Project <b>${name}</b> successfully deleted`,
          dangerouslyUseHTMLString: true,
          type: 'success',
          showClose: false,
          duration: 3000,
          position: 'bottom-right'
        })
      })
  },

  DELETE_ALL_PROJECTS (context) {
    return new Promise((resolve) => {
      context.getters.projectIds.forEach(projectId => {
        context.commit('localStorage__deleteProject', projectId)
      })
      const noLsProjects = Object.keys(localStorage)
        .filter(key => { return context.getters.regex.isProject.test(key) })
        .length === 0
      if (noLsProjects) { resolve() }
    })
      .then(() => {
        context.commit('deleteAllProjects')
        return context.getters.projectIds.length === 0
      })
      .then((stillOk) => {
        if (stillOk) {
          context.commit('setActiveProjectId', null)
          Notification.success({
            title: `Deletion successful`,
            message: `All projects successfully deleted`,
            type: 'success',
            showClose: false,
            duration: 3000,
            position: 'bottom-right'
          })
        }
      })
  }
}
