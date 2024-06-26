import { registerPlugins } from '@/plugins'
import App from './src/App.vue'
import { createApp } from 'vue'
import './styles.css'; 
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import router from './routes.js'

const app = createApp(App)
app.config.productionTip = false;
app.use(router)
app.config.devtools = false;
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
registerPlugins(app)

app.mount('#app')
