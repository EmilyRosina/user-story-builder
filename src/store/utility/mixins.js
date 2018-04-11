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
    closeModal () {
      this.$store.commit('closeModal')
    }
  }
}

export {
  redirectIfNewUser,
  closeModal
}
