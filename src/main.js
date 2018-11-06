import '@aeternity/aepp-components/dist/ae-toolbar/ae-toolbar.css'

import './sections/index.js'

import Vue from 'vue'
import app from './app.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(app)
}).$mount('#app')
