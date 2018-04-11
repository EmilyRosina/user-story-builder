// eslint-disable-next-line
import { Message, Notification } from 'element-ui'
// http://element.eleme.io/#/en-US/component/notification
// http://element.eleme.io/#/en-US/component/message

export default {
  GET_PROJECTS (context) {
    let projects = {}
    Object.keys(localStorage)
      .filter(key => { return context.getters.regex.isProject.test(key) })
      .forEach(key => { projects[key] = Object.assign(JSON.parse(localStorage[key]), { id: key }) })
    context.commit('setProjects', { projects })
  },

  // payload: { id, name }
  GET_PROJECT_DATA (context, payload) {
    let project = JSON.parse(localStorage[payload.id])
    context.commit('setProjectData', Object.assign({}, { id: payload.id }, project))
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
        Notification.success({
          title: `New project added`,
          message: `Successfully added project <b>${name}</b>`,
          dangerouslyUseHTMLString: true,
          type: 'success',
          showClose: false,
          duration: 3000,
          position: 'bottom-right'
        })
        context.commit('closeModal')
      }
    })
  },

  // payload: { name }
  RENAME_PROJECT (context, payload) {
    const id = context.state.active.project.id
    const origName = context.state.active.project.name
    const name = payload.name
    let project = Object.assign({}, context.state.active.project, { name })
    delete project.id
    return new Promise((resolve) => {
      context.commit('localStorage__updateProject', { id, project })
      if (JSON.parse(localStorage[id]).name === name) { resolve() }
    })
    .then(() => {
      context.commit('renameProject', { name, id })
      Notification.success({
        title: `Rename successful`,
        message: `Successfully renamed <b>${origName}</b> to <b>${name}</b>`,
        dangerouslyUseHTMLString: true,
        type: 'success',
        showClose: false,
        duration: 3000,
        position: 'bottom-right'
      })
      context.commit('closeModal')
    })
  },

  DELETE_PROJECT (context, payload) {
    const id = payload.id
    const name = context.getters.projectMap[id]
    return new Promise((resolve) => {
      context.commit('localStorage__deleteProject', { id })
      if (!localStorage[id]) { resolve() }
    })
    .then(() => {
      context.commit('deleteProject', { id })
      return !context.getters.projectIds.includes(id)
    })
    .then((stillOk) => {
      if (stillOk && context.getters.isReturningUser) {
        const firstProjectId = context.getters.projectIds[0]
        const firstProject = Object.assign({}, context.state.projects[firstProjectId], { id: firstProjectId })
        context.commit('setProjectData', firstProject)
        return context.state.active.project.id === firstProjectId
      }
      if (stillOk && context.getters.isNewUser) {
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
        context.commit('localStorage__deleteProject', { id: projectId })
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
