import { createApp } from 'vue'
import './style.css'
import 'vue-json-viewer/style.css'
import JsonViewer from 'vue-json-viewer'
import App from './App.vue'

createApp(App)
    .use(JsonViewer)
    .mount('#app')
