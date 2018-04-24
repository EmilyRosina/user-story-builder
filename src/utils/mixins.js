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

export {
  redirectIfNewUser,
  closeModal
}
