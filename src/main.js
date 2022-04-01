import { createApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import './index.css'
import routes from '../router/index'
import App from './App.vue'
import store from '../vuex/store'






const router = createRouter({
    history: createMemoryHistory(),
    routes
})




createApp(App)

.use(router)
    .use(store)
    .mount('#app')