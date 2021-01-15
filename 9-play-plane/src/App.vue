<template>
  <container>
    <currentPage @change-page="handleChangePage"></currentPage>
    <!-- <GamePage></GamePage> -->
  </container>
</template>

<script>
import StartPage from "./pages/StartPage";
// import GamePage from "./pages/GamePage";
// eslint-disable-next-line no-unused-vars
import { computed, ref } from "vue";
import GamePage from "./pages/GamePage.vue";
import EndPage from "./pages/EndPage";
export default {
  name: "App",
  components: {
    // GamePage,
    // StartPage,
  },
  setup() {
    // 利用计算属性来做
    // let currentPageName = ref("StartPage");
    let currentPageName = ref("GamePage");
    // let currentPageName = ref("EndPage");
    const currentPage = computed(() => {
      if (currentPageName.value === "StartPage") {
        return StartPage;
      } else if (currentPageName.value === "GamePage") {
        return GamePage;
      } else if (currentPageName.value === "EndPage") {
        return EndPage;
      }
    });

    const handleChangePage = (page) => {
      // page
      // console.log(page);
      currentPageName.value = page;
      // currentPageName = page;
    };

    return {
      currentPage,
      handleChangePage,
    };
  },
};
</script>
