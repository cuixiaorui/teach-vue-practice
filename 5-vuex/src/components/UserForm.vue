<template>
  <div>
    <table>
      <tr>
        <th>id</th>
        <th>用户名</th>
        <th>邮箱</th>
        <th>性别</th>
        <th>爱好</th>
        <th>操作</th>
      </tr>
      <tr v-cloak v-for="(item, index) of formData" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.hobby.join(" | ") }}</td>
        <td>
          <button @click="modify(index)">修改</button>
          <button @click="deleteData(item.id)">删除</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentModifyIndex: -1,
    };
  },
  computed: {
    formData() {
      return this.$store.state.formData;
    },
    currentModifyItem() {
      return this.$store.state.formData[this.currentModifyIndex];
    },
  },
  methods: {
    modify(index) {
      this.currentModifyIndex = index;
      this.$router.push({
        name: "Modify",
        params: {
          visible: true,
          item: this.currentModifyItem,
        },
      });
    },
    deleteData(id) {
      // 删除指定的数据
      this.$store.commit("deleteForm", {
        id,
      });
    },
  },
};
</script>

<style></style>
