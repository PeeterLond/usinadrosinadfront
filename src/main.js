import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "@/assets/css/style.css"


// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, fas, faR } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import {fab} from "@fortawesome/free-brands-svg-icons";

library.add(faUserSecret, fas, faR, far, fab)

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
