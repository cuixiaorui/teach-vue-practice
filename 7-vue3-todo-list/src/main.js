import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "element3/lib/theme-chalk/index.css";
import Element3 from "element3";

createApp(App).use(store).use(Element3).mount("#app");
