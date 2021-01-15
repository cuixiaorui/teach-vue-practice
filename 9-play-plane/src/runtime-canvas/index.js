// 实现基于 canvas 自定义的渲染器
import { createRenderer } from "vue";
import { Container, Texture, Sprite, Text } from "pixi.js";

const renderer = createRenderer({
  createElement(type) { // 容器 以及 图片
    let element;
    switch (type) {
      case "container":
        element = new Container();
        break;
      case "sprite":
        element = new Sprite();
        break;
    }

    return element;
  },

  insert(el, parent) {
    if (el) {
      parent.addChild(el);
    }
  },
  parentNode(node) {
    // 获取当前 node 的父级节点
    // parent
    return node.parent;
  },
  remove(el) {
    // 当删除一个元素的时候 进行调用
    if (el && el.parent) {
      // removeChild(el)
      el.parent.removeChild(el);
    }
  },
  patchProp(el, key, prevValue, nextValue) {
    // props
    // console.log(key, nextValue);
    switch (key) {
      case "texture":
        // 给图片 src 的时候
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        // onClick
        el.on("pointertap", nextValue);
        break;
      default:
        el[key] = nextValue;
        break;
    }
  },
  // 必须要的
  createText(text) {
    return new Text(text);
  },

  nextSibling() {},
  createComment() {},
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
