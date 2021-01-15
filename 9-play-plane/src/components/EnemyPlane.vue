<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
  </container>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "vue";
import enemyImg from "../assets/enemy.png";
import { game } from "../game";
export default {
  setup() {
    return {
      enemyImg,
    };
  },
};

export function useEnemyPlane() {
  const width = 398;
  const height = 207;
  const HP = 3;
  const enemyPlanes = reactive([]);

  // 1秒创建一个敌军
  function autoCreateEnemyPlane() {
    function createEnemyPlane() {
      return {
        // x 的范围
        x: Math.floor(Math.random() * (400 - 50 + 1) + 50),
        // y 的范围
        y: Math.floor(Math.random() * (150 - 50 + 1) + 50),
        width,
        height,
        HP,
      };
    }

    setInterval(() => {
      enemyPlanes.push(createEnemyPlane());
    }, 1000);
  }

  // eslint-disable-next-line no-unused-vars
  function move() {
    const speed = 5;
    const handleTicker = () => {
      enemyPlanes.forEach((enemy, index) => {
        enemy.y += speed;

        if (enemy.y >= 1280) {
          // 当敌军超出屏幕时，需要销毁
          enemyPlanes.splice(index, 1);
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
  autoCreateEnemyPlane();

  function beingAttacked(enemyInfo, enemyIndex) {
    // 减血
    enemyInfo.HP--;

    if (enemyInfo.HP <= 0) {
      // 销毁
      enemyPlanes.splice(enemyIndex, 1);
    }
  }

  return {
    enemyPlanes,
    beingAttacked,
  };
}
</script>
