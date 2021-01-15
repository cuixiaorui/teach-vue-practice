import {
  defineComponent,
  h,
  ref,
  onMounted,
  onUnmounted,
  reactive,
} from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const { x } = useMove();

    return {
      x,
    };
  },
  render(ctx) {
    return h("circle", { x: ctx.x, y: 200 });
  },
});

function useMove() {
  const stageWidth = 750;

  const moveX = ref(200);

  const r = 50 * 2;
  let intervalNumber;
  const speed = 1;
  let dir = 1;
  onMounted(() => {
    intervalNumber = setInterval(() => {
      moveX.value += speed * dir;

      if (moveX.value > stageWidth - r) {
        dir = -1;
      }

      if (moveX.value < 0 + r) {
        dir = 1;
      }
    });
  });

  onUnmounted(() => {
    clearInterval(intervalNumber);
  });

  return {
    x: moveX,
  };
}
