<template>
  <div>
    todo-list

    <div><input type="text" v-model="newTodo" @keyup.enter="addTodo" /></div>
    <div>
      <ul>
        <li v-for="item in showTodoList" :key="item.id">
          <TodoItem :item="item"></TodoItem>
        </li>
      </ul>
    </div>

    <div>
      <el-button @click="changeShowMode('all')">all</el-button>
      <el-button @click="changeShowMode('active')">active</el-button>
      <el-button @click="changeShowMode('completed')">completed</el-button>
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

    const currentShowMode = ref("all");
    const showTodoList = computed(() => {
      return store.state.todoList.filter((todoItem) => {
        if (currentShowMode.value === "all") {
          return todoItem;
        } else if (currentShowMode.value === "active") {
          return todoItem.state === "active";
        } else if (currentShowMode.value === "completed") {
          return todoItem.state === "completed";
        }
      });
    });

    const changeShowMode = (mode) => {
      currentShowMode.value = mode;
    };

    const addTodo = () => {
      store.commit("addTodo", {
        context: newTodo.value,
      });

      // reset
      newTodo.value = "";
    };

    return {
      changeShowMode,
      showTodoList,
      newTodo,
      addTodo,
      todoList,
    };
  },
};
</script>

<style></style>
