import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupDirectives } from './directives'
import { setupStore } from './store'


const bootstrap = async () => {
  const app = createApp(App)
  setupDirectives(app)
  setupStore(app)
  app.mount('#app')
}

bootstrap()
