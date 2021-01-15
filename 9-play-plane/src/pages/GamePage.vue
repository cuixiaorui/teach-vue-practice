<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
    <EnemyPlane
      v-for="(enemy, index) in enemyPlanes"
      :key="index"
      :x="enemy.x"
      :y="enemy.y"
    ></EnemyPlane>

    <Bullet
      v-for="(bullet, index) in bullets"
      :key="index"
      :x="bullet.x"
      :y="bullet.y"
    ></Bullet>
  </container>
</template>

<script>
import Map from "../components/Map";
import Plane, { usePlane } from "../components/Plane";
import EnemyPlane, { useEnemyPlane } from "../components/EnemyPlane";
import Bullet, { useBullets } from "../components/Bullet";
import { onMounted, onUnmounted } from "vue";
import { game } from "../game";
import { hitTestObject } from "../utils";
export default {
  components: {
    Map,
    Bullet,
    Plane,
    EnemyPlane,
  },
  setup(props, { emit }) {
    // 我放飞机
    const { planeInfo } = usePlane({
      onAttack(position) {
        addBullet(position);
      },
    });
    // 敌军
    const { enemyPlanes, beingAttacked } = useEnemyPlane();
    // 我方飞机的子弹
    const { bullets, addBullet } = useBullets();

    // 核心战斗逻辑
    useFighting({ planeInfo, enemyPlanes, bullets, emit, beingAttacked });

    return {
      planeInfo,
      enemyPlanes,
      bullets,
    };
  },
};

function useFighting({ enemyPlanes, planeInfo, bullets, emit, beingAttacked }) {
  // 数据有没有
  // 检测
  // 怎么检测？
  // 每时每刻去检测
  const handleTicker = () => {
    // 碰撞检测
    enemyPlanes.forEach((enemy) => {
      if (hitTestObject(enemy, planeInfo)) {
        emit("change-page", "EndPage");
      }
    });

    // 我方子弹和敌军的检测
    // 代码的可读性一开始的时候是大于性能
    enemyPlanes.forEach((enemy, enemyIndex) => {
      bullets.forEach((bullet, bulletIndex) => {
        if (hitTestObject(enemy, bullet)) {
          // 销毁
          // 敌军有生命的概念
          beingAttacked(enemy, enemyIndex);
          bullets.splice(bulletIndex, 1);
        }
      });
    });
  };

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}
</script>

<style></style>
