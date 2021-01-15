<template>
  <container>
    <sprite :texture="bulletImg"></sprite>
  </container>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "vue";
import bulletImg from "../assets/bullet.png";
import { game } from "../game";
export default {
  setup() {
    return {
      bulletImg,
    };
  },
};

export function useBullets() {
  const width = 61;
  const height = 99;
  const bullets = reactive([]);

  function addBullet({ x, y }) {
    bullets.push({ x, y, width, height });
  }

  function move() {
    const speed = 10;
    const handleTicker = () => {
      bullets.forEach((bullet, bulletIndex) => {
        bullet.y -= speed;
        // 当子弹超出屏幕时，需要销毁
        if (bullet.y < -100) {
          bullets.splice(bulletIndex, 1);
        }
      });
    };

    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });
  }

  move();

  return {
    addBullet,
    bullets,
  };
}
</script>

<style lang="scss" scoped></style>
