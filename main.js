import { registerPlugins } from '@/plugins'
import App from './src/App.vue'
import { createApp } from 'vue'
import './styles.css'; 
import router from './routes.js'

const app = createApp(App)
app.config.productionTip = false;
app.use(router)

app.config.devtools = false;

registerPlugins(app)

app.mount('#app')
