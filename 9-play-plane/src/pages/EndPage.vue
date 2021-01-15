<template>
  <container>
    <sprite :texture="endPageImg" ref="startPage"></sprite>
    <sprite
      :texture="restartBtnImg"
      x="250"
      y="520"
      @click="toGame"
      :interactive="true"
    ></sprite>
  </container>
</template>

<script>
import endPageImg from "../assets/end_page.jpg";
import restartBtnImg from "../assets/restartBtn.png";
import { ref, onMounted } from "vue";
export default {
  setup(props, { emit }) {
    // 没有 this this.$emit
    function toGame() {
      console.log("toGame");
      emit("change-page", "GamePage");
    }

    const startPage = ref(null);

    onMounted(() => {
      console.log(startPage);
    });

    return {
      startPage,
      endPageImg,
      restartBtnImg,
      toGame,
    };
  },
};
</script>

<style></style>
