function createElement(type) {
  // canvas ?
  return document.createElement(type);
}

function patchProp(el, key, prevValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key);
  } else {
    // 支持 onXXX
    if (key.startsWith("on")) {
      const eventName = key.slice(2).toLocaleLowerCase();
      el.addEventListener(eventName, nextValue);
    } else {
      el.setAttribute(key, nextValue);
    }
  }
}

// 把虚拟节点转换成真实的节点
export function mountElement(vnode, container) {
  // type
  // props
  // children
  const { type, props, children } = vnode;

  const el = (vnode.el = createElement(type));

  // props
  if (props) {
    for (const key in props) {
      const val = props[key];
      patchProp(el, key, null, val);
    }
  }

  // children
  if (typeof children === "string") {
    const text = document.createTextNode(children);
    el.append(text);
  } else if (Array.isArray(children)) {
    // 递归
    children.forEach((v) => {
      mountElement(v, el);
    });
  }

  // insert
  container.append(el);
}

// n1 是老的 vnode
// n2 是新的 vnode
export function diff(n1, n2) {
  // type
  if (n1.type !== n2.type) {
    // 如果 type 不一样的话，那么直接用新的 type 来替换掉之前的
    n1.el.replaceWith(createElement(n2.type));
  } else {
    // 处理 props
    // 新的： {id:"test",data-hei ="123"}
    // 旧的: {id: "test-old",data-test="test"}
    const el = (n2.el = n1.el);

    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    // 处理新值
    Object.keys(newProps).forEach((key) => {
      // 如果新的值 不等于 旧的值 那么更新
      if (newProps[key] !== oldProps[key]) {
        patchProp(el, key, oldProps[key], newProps[key]);
      }
    });

    // 处理老值
    // 如果老的props 里面有，而新的props 里面没有的话 那么就需要删除
    Object.keys(oldProps).forEach((key) => {
      if (!newProps[key]) {
        patchProp(el, key, oldProps[key], null);
      }
    });

    // 处理 children
    // children -> string | array
    // newChildren -> string -> oldChildren string | array
    // newChildren -> array  ->oldChildren string | array
    const newChildren = n2.children || [];
    const oldChildren = n1.children || [];

    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        // 还需要对比一下 children 是否不同
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else if (Array.isArray(oldChildren)) {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      // 数组
      if (typeof oldChildren === "string") {
        // 清空一下
        el.innerHTML = ``;
        newChildren.forEach((v) => {
          mountElement(v, el);
        });
      } else if (Array.isArray(oldChildren)) {
        // 有意思的来了
        // 2个 都是 数组了
        // 源码里面是特别复杂的
        // 暴力算法 最简单的方式来实现
        // 第一种情况：
        // old: {a,b,c}
        // new: {a,b,e}
        // 长度是一致的
        // 直接调用 diff 做递归处理
        // 第二种情况
        // old: {a,b,c,d,e,f}
        // new: {a,b,e}
        // 老的比新的长
        // 老的多出来的 都需要删除掉
        // 第三种情况
        // old: {a,b,c}
        // new: {a,b,c,e}
        // 新的比老的长
        // 新的需要创建

        // 公共长度
        const length = Math.min(newChildren.length, oldChildren.length);

        for (let i = 0; i < length; i++) {
          const oldVnode = oldChildren[i];
          const newVnode = newChildren[i];

          diff(oldVnode, newVnode);
        }

        // 如果老的多，那么需要删除掉
        if (oldChildren.length > length) {
          for (let i = length; i < oldChildren.length; i++) {
            const vnode = oldChildren[i];
            // 父级节点删除子节点
            el.removeChild(vnode.el);
          }
        }

        // 如果新的多，那么需要创建
        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            const vnode = newChildren[i];
            mountElement(vnode, el);
          }
        }
      }
    }
  }
}
