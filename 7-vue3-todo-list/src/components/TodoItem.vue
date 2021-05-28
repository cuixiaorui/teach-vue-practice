<template>
  <div :class="{ completed: isCompleted }">
    {{ item.context }}
    <el-button type="danger" @click="removeTodo">X</el-button>
    <el-button type="success" @click="completeTodo">completed</el-button>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["item"],
  setup(props) {
    const store = useStore();
    const removeTodo = () => {
      store.commit("removeTodo", { id: props.item.id });
    };

    const completeTodo = () => {
      store.commit("completeTodo", { id: props.item.id });
    };

    const isCompleted = computed(() => props.item.state === "completed");

    return {
      completeTodo,
      isCompleted,
      removeTodo,
    };
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
