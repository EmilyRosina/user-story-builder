import Vue from 'vue'

import mainLayout from '@/layouts/Main'

const components = [
  mainLayout
]

components.forEach(component => {
  Vue.component(component.name, component)
})
