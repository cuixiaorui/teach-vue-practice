<template>
  <div>
    todo-list

    <div><input type="text" v-model="newTodo" @keyup.enter="addTodo" /></div>
    <div>
      <ul>
        <li v-for="item in todoList" :key="item.id">
          <TodoItem :item="item"></TodoItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import TodoItem from "./TodoItem.vue";
export default {
  components: {
    TodoItem,
  },
  setup() {
    const store = useStore();

    const todoList = computed(() => store.state.todoList);

    const newTodo = ref("");

    const addTodo = () => {
      store.commit("addTodo", {
        context: newTodo.value,
      });

      // reset
      newTodo.value = "";
    };

    return {
      newTodo,
      addTodo,
      todoList,
    };
  },
};
</script>

<style></style>
