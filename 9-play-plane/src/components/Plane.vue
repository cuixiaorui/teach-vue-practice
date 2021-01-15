<template>
  <container>
    <sprite :texture="planeImg"></sprite>
  </container>
</template>

<script>
import planeImg from "../assets/plane.png";
import { reactive, onMounted, onUnmounted } from "vue";
export default {
  setup() {
    return {
      planeImg,
    };
  },
};

export function usePlane({ onAttack }) {
  const planeInfo = reactive({
    x: 150,
    y: 350,
    width: 258,
    height: 364,
  });

  // eslint-disable-next-line no-unused-vars
  function move() {
    const speed = 10;
    function handleMove(e) {
      switch (e.code) {
        case "ArrowUp":
          planeInfo.y -= speed;
          break;
        case "ArrowDown":
          planeInfo.y += speed;
          break;
        case "ArrowLeft":
          planeInfo.x -= speed;
          break;
        case "ArrowRight":
          planeInfo.x += speed;
          break;
        default:
          break;
      }
    }
    onMounted(() => {
      window.addEventListener("keyup", handleMove);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleMove);
    });
  }
  // 关注点分离
  function attack() {
    function handleMove(e) {
      if (e.code === "Space") {
        onAttack &&
          onAttack({
            x: planeInfo.x + 100,
            y: planeInfo.y,
          });
      }
    }
    onMounted(() => {
      window.addEventListener("keyup", handleMove);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleMove);
    }); // 当按下空格的时候
  }

  move();
  attack();

  return { planeInfo };
}
</script>
