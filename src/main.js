import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import appAxios from "@/utils/appAxios.js"
import store from "@/store"

import appHeader from "@/components/Shared/appHeader.vue"
import appItemList from "@/components/Shared/appItemList/index.vue"

const app = createApp(App)

app.component("appHeader", appHeader)

app.component("appItemList", appItemList)

app.use(router)

app.use(store)

app.config.globalProperties.$appAxios = appAxios

app.mount('#app')
