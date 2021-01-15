import Vue from "vue";
import Vuex from "vuex";
import { apiGetFormData, apiDeleteFormData, apiModifyFormData } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    formData: [],
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

    updateFormData(state, payload) {
      state.formData = payload.data;
    },
  },
  actions: {
    async getFormData({ commit }) {
      const { data } = await apiGetFormData();
      commit("updateFormData", data);
    },

    async deleteForm({ commit }, payload) {
      const { data } = await apiDeleteFormData(payload.id);
      commit("updateFormData", data);
    },

    async modifyForm({ commit }, payload) {
      const { data } = await apiModifyFormData(payload);
      commit("updateFormData", data);
    },
  },
  modules: {},
});
