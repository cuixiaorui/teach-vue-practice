import { reactive, watchEffect } from "./core/reactivity/index.js";
import { h } from "./core/h.js";
export default {
  render(context) {
    // 构建 view
    // b
    // 0. mini-vue
    // 1. 优化点，没有必要把之前的 dom 都干掉
    // 2. 如何去优化着一点呢？ -> diff
    // 3. vdom -> js 对象来表示  -》 diff
    // 4 .写死的 dom  -> canvas
    // 5. 渲染api 抽象出来
    // 6. 整理出初始化流程
    // document.querySelector("#app").innerHTML = ``;
    // diff -> vDom
    // diff
    // dom -> dom element
    // const div = document.createElement("div");
    // 响应式数据 get set
    // div.innerText = context.state.count;

    // div -> app  root 容器
    // return div;
    // 1. string  2. 数组的写法
    // return h("div", { id: "test" }, "test for app");
    return h("div", { id: "id:" + context.state.count }, [
      h("p", null, "count:" + context.state.count),
      h("p", null, "double:" + context.state.double),
      h(
        "button",
        {
          onClick: context.handleClick,
        },
        "click"
      ),
      h("p", null, "child2"),
    ]);
  },

  // template -> render -> vnode

  setup() {
    const state = reactive({
      count: 1,
      double: 1,
    });

    watchEffect(() => {
      state.double = state.count * 2;
    });

    const handleClick = () => {
      state.count++;
    };

    return {
      handleClick,
      state,
    };
  },
};
