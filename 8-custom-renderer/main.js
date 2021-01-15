import { createApp } from "./src/runtime-canvas";
import App from "./src/App";
import { getCanvasRootContainer } from "./src/Game";

createApp(App).mount(getCanvasRootContainer());
