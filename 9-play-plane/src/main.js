import { createApp } from "./runtime-canvas";
import { getRootContainer } from "./game";
import App from "./App.vue";

console.warn = () => {};

createApp(App).mount(getRootContainer());
