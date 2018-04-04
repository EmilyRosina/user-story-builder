const redirectIfNewUser = {
  created () {
    let isHomeRoute = this.$route.name === 'home'
    if (!isHomeRoute && this.$store.getters.isNewUser) {
      this.$router.push({ name: 'home' })
    }
  }
}

export {
  redirectIfNewUser
}
