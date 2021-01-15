// 程序的入口
import { watchEffect } from "./reactivity/index.js";
import { mountElement,diff } from "./renderer.js";
export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup();
      let isMounted = false;
      let prevSubTree = null;

      watchEffect(() => {
        if (!isMounted) {
          // 初始化的时候
          isMounted = true;
          const subTree = rootComponent.render(setupResult);
          // vnodeTree
          console.log(subTree);

          rootContainer.innerHTML = ``;
          mountElement(subTree, rootContainer);
          // rootContainer.append(element);
          prevSubTree = subTree;
        } else {
          // update
          // diff
          // 我们需要2个节点 当前 subTree  之前的 subTree
          const subTree = rootComponent.render(setupResult);
          console.log("currentSubTree", subTree);
          console.log("prevSubTree", prevSubTree);
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
}
