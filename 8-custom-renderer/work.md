## 第二天作业

通过 pixi.js 绘制出一个小球
然后让小球一直向右移动

1. 组件挂载完成后在让小球移动
2. 组件销毁后需要移除循环监听
3. 小球碰到屏幕会回弹

## 答案

```
import {
  defineComponent,
  h,
  ref,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
export default defineComponent({
  setup() {
    const stageWidth = 750;

    const moveX = ref(200);

    const r = 50 * 2;
    let intervalNumber;
    const speed = 1;
    let dir = 1;
    onMounted(() => {
      intervalNumber = setInterval(() => {
        moveX.value += speed * dir;

        if(moveX.value > stageWidth - r )
        {
          dir = -1
        }

        if(moveX.value < 0 + r){
          dir = 1
        }
      });
    });

    onUnmounted(() => {
      clearInterval(intervalNumber);
    });

    return {
      x: moveX,
    };
  },
  render(ctx) {
    return h("circle", { x: ctx.x, y: 200 });
  },
});

```
