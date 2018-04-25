const redirectIfNewUser = {
  created () {
    let isHomeRoute = this.$route.name === 'home'
    if (!isHomeRoute && this.$store.getters.isNewUser) {
      this.$router.push({ name: 'home' })
    }
  }
}

const closeModal = {
  methods: {
    closeModal (activePropToBeSet = null) {
      if (activePropToBeSet) {
        activePropToBeSet = activePropToBeSet.charAt(0).toUpperCase() + activePropToBeSet.slice(1)
        this.$store.commit(`setActive${activePropToBeSet}`, '')
      }
      this.$store.commit('closeModal')
    }
  }
}

const addEditDataGroup = {
  methods: {
    startTyping (key) {
      this.properties[key].new = false
    },
    addProperty () {
      let id = Date.now()
      this.$set(this.properties, id, {
        id,
        value: '',
        new: true,
        _isNew () { return this.new },
        _hasNoName () { return this.value === '' }
      })
    },
    removeProperty (key) {
      this.$delete(this.properties, key)
    }
  },
  computed: {
    modalWidth () {
      return this.breakpointIs('xs') ? '90%' : '500px'
    },
    nonUniqueProperties () {
      let propertiesMap = {}
      Object.keys(this.properties)
        .forEach(propKey => {
          propertiesMap[this.properties[propKey].value]
            ? propertiesMap[this.properties[propKey].value] = 'not unique'
            : propertiesMap[this.properties[propKey].value] = 'unique'
        })
      Object.keys(propertiesMap).forEach(propKey => {
        if (propertiesMap[propKey] === 'unique' || propKey === '') delete propertiesMap[propKey]
      })
      return Object.keys(propertiesMap)
    },
    validationChecks () {
      return {
        hasName: this.name !== '',
        typing: this.typing === true,
        propertyNamesAreUnique: !this.nonUniqueProperties.length > 0,
        nameIsUnique: !Object.keys(this.project.dataGroups)
          .map(key => this.project.dataGroups[key].name)
          .includes(this.name),
        allPropertiesHaveNames: this.properties && !this.propertyNames.includes(''),
        nonNewpropertiesHaveNames: this.properties && !this.nonNewPropertyNames.includes(''),
        hasChanges: this.typing
          ? null
          : {
            orig: this.project.dataGroups[this.index],
            new: this.updatedDataGroup,
            result: this.updatedDataGroup === this.project.dataGroups[this.index]
          }
      }
    },
    errors () {
      let [name, properties] = [[], []]
      let check = this.validationChecks
      if (check.typing) {
        // name
        if (!check.hasName) { name.push({text: 'You must supply a name', icon: ''}) }
        if (!check.nameIsUnique) { name.push({text: 'Name already exists', icon: ''}) }
        // properties
        if (!check.nonNewpropertiesHaveNames) { properties.push({text: 'All properties must be named', icon: 'exclamation-triangle'}) }
        if (!check.propertyNamesAreUnique) { properties.push({text: `Properties [${this.nonUniqueProperties.join('] [')}] are not unique`, icon: 'clone'}) }
      }
      return {
        name,
        properties
      }
    },
    validated () {
      return !Object.values(this.validationChecks).includes(false)
    },
    hasProperties () {
      return this.propertyNames.length > 0
    },
    propertyNames () {
      return Object.keys(this.properties)
        .map(key => this.properties[key].value)
    },
    nonNewPropertyNames () {
      return Object.keys(this.properties)
        .filter(key => !this.properties[key]._isNew())
        .map(key => this.properties[key].value)
    }
  }
}

export {
  redirectIfNewUser,
  closeModal,
  addEditDataGroup
}
