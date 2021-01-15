// 创建一个虚拟dom
// js -> object
// 来描述一个 dom element 的对象
// dom element -> 1. type 2. props 属性 3. children

// vnode
// vue3  h
// createVNode
export function h(type, props, children) {
  return {
    type,
    props,
    children,
  };
}
