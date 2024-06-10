import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';

/*
createApp(App).mount('#app')

const app = createApp(App)

//安装router
app.use(router as any)

app.mount('#app')
*/
const app = createApp(App);
app.use(router);
app.mount('#app');

