import { createStore } from "vuex";
import { generateId } from "../utils/generateId.js";

const createTodoItem = (context) => {
  return {
    id: generateId(),
    context,
    state: "active",
  };
};

export default createStore({
  state: {
    todoList: [],
  },
  mutations: {
    addTodo(state, { context }) {
      // create new todoItem
      state.todoList.push(createTodoItem(context));
    },
    removeTodo(state, { id }) {
      state.todoList = state.todoList.filter((todo) => todo.id !== id);
    },

    completeTodo(state, { id }) {
      const todoItem = state.todoList.find((todo) => todo.id === id);
      const isCompleted = (todo) => todo.state === "completed";

      if (todoItem) {
        todoItem.state = isCompleted(todoItem) ? "active" : "completed";
      }
    },
  },
  actions: {},
  modules: {},
});
