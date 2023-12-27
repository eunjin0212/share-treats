import { createApp } from 'vue'
import { initApp } from "@/plugins/app-pre-init";
import App from './example.vue'

initApp(createApp(App)).then((app) =>
    app
        // .use(VueCookies)
        .mount("#app")
);