import { createApp } from 'vue'
import { initApp } from "@/plugins/app-pre-init";
import App from './login.vue'
import '@/index.css'

initApp(createApp(App)).then((app) =>
  app.mount("#app")
);