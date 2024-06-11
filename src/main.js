import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import './styles.css'; 

const app = createApp(App)
app.config.productionTip = false;

app.config.devtools = false;

registerPlugins(app)

app.mount('#app')
