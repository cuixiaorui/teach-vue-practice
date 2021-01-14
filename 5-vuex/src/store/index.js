import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    formData: [
      {
        id: 1,
        username: "小红",
        email: "xiaohong@qq.com",
        gender: "女",
        hobby: ["弹琴", "读书"],
      },
      {
        id: 2,
        username: "小黑",
        email: "xiaohei@qq.com",
        gender: "男",
        hobby: ["篮球", "读书", "编程"],
      },
      {
        id: 3,
        username: "小亮",
        email: "xiaoliang@qq.com",
        gender: "男",
        hobby: ["篮球", "读书", "编程"],
      },
      {
        id: 4,
        username: "小五",
        email: "xiaowu@qq.com",
        gender: "男",
        hobby: ["篮球", "读书", "编程"],
      },
      {
        id: 5,
        username: "小海",
        email: "aaa@qq.com",
        gender: "男",
        hobby: ["篮球", "读书", "编程"],
      },
      {
        id: 6,
        username: "小紫",
        email: "aaa@qq.com",
        gender: "男",
        hobby: ["篮球", "读书", "编程"],
      },
    ],
  },
  mutations: {
    login(state, payload) {
      state.username = payload.username;
    },

    modifyForm(state, payload) {
      const rawData = state.formData.find((d) => d.id === payload.id);
      if (rawData) {
        rawData.hobby = payload.hobby;
        rawData.username = payload.username;
        rawData.email = payload.email;
        rawData.gender = payload.gender;
      }
    },

    deleteForm(state, payload) {
      const { id } = payload;
      const index = state.formData.findIndex((d) => d.id === id);
      state.formData.splice(index, 1);
    },
  },
  actions: {},
  modules: {},
});
