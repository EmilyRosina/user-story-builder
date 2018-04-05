export default {
  dataGroups: [],             // TODO: remove
  selectedDataGroup: {        // TODO: remove
    index: null,
    dataGroup: null
  },
  editingDataGroup: false,    // TODO: remove
  addingNewDataGroup: false,  // TODO: remove
  activeTab: 'dataGroups',    // TODO: remove

  // new version; to replace above code with
  active: {
    tab: '',
    dataGroup: '',
    project: {
      name: '',
      dataGroups: [],
      userStories: [],
      userJourney: []
    }
  },
  projectIds: []
}
