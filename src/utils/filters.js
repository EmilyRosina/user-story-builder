import Vue from 'vue'

Vue.filter('capitalise', (value) => {
  if (typeof (value) !== 'string') {
    console.error(`Filter 'capitalise': String not provided, please provide string`)
    return
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
})
