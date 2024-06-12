import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import './styles.css'; 
import VueBinpackerPlugin from 'vue-binpacker-plugin'

const app = createApp(App)
app.use(VueBinpackerPlugin)
app.config.productionTip = false;

app.config.devtools = false;

registerPlugins(app)

app.mount('#app')
