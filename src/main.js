import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naiveui from 'naive-ui'
import router from './router'
import Provider from './components/Provider.vue'

import { maska } from 'maska'
const app = createApp(Provider)

app.use(createPinia())
app.use(router)
app.use(naiveui)
app.directive('maska', maska)
app.mount('#app')
