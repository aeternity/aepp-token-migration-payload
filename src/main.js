import '@aeternity/aepp-components/dist/ae-button/ae-button.css'
import '@aeternity/aepp-components/dist/ae-icon/ae-icon.css'

import './sections/index.js'

import Vue from 'vue'
import app from './app.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(app)
}).$mount('#app')
