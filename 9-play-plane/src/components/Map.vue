<template>
  <container>
    <sprite :texture="mapImg" :y="mapY1"></sprite>
    <sprite :texture="mapImg" :y="mapY2"></sprite>
  </container>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import mapImg from "../assets/map.jpg";
import { game } from "../game";
export default {
  setup() {
    const viewHeight = 1080;

    const mapY1 = ref(0);
    const mapY2 = ref(-viewHeight);

    const speed = 8;
    function handleTicker() {
      mapY1.value += speed;
      mapY2.value += speed;

      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight;
      }

      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight;
      }
    }

    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });

    return {
      mapImg,
      mapY1,
      mapY2,
    };
  },
};
</script>

<style></style>
