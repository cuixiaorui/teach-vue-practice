// const { ref, reactive, effect } = require("@vue/reactivity");
// import {
//   ref,
//   reactive,
//   effect,
// } from "@vue/reactivity/dist/reactivity.esm-browser";
// import { reactive, watchEffect } from "./core/reactivity/index.js";

// 收集依赖 和 触发依赖的过程？

// const a = ref(10);

// let b;
// // view -> 响应式数据

// // watchEffect
// effect(() => {
//   b = a.value + 10;
//   console.log(b);
// });

// a.value = 20;

// reutrn {} -> setup  -> temaplte

// vue3 的更新机制 -> 最小模型
// vue3 -> mini
// const App = {
//   // template -> render
//   render(context) {
//     // 构建 view
//     // b
//     watchEffect(() => {
//       // 0. mini-vue
//       // 1. 优化点，没有必要把之前的 dom 都干掉
//       // 2. 如何去优化着一点呢？ -> diff
//       // 3. vdom -> js 对象来表示  -》 diff
//       // 4 .写死的 dom  -> canvas
//       // 5. 渲染api 抽象出来
//       // 6. 整理出初始化流程
//       document.querySelector("#app").innerHTML = ``;
//       // diff -> vDom
//       const div = document.createElement("div");
//       // 响应式数据 get set
//       div.innerText = context.state.count;
//       // 添加到
//       document.querySelector("#app").append(div);
//     });
//   },

//   setup() {
//     const state = reactive({
//       count: 1,
//     });
//     window.state = state;
//     // count -> change
//     return {
//       state,
//     };
//   },
// };

// App.render(App.setup());

import { createApp } from "./core/index.js";
import App from "./App.js";

// 这个 api 熟悉嘛？
createApp(App).mount(document.querySelector("#app"));
