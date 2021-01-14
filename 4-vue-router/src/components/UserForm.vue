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
          <button @click="deleteData(index)">删除</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      currentModifyIndex: -1,
    };
  },
  computed: {
    currentModifyItem() {
      return this.formData[this.currentModifyIndex];
    },
  },
  methods: {
    findDataById(id) {
      return this.formData.find((d) => d.id === id);
    },

    handleSave(info) {
      // 基于id找到具体的数据
      const rawData = this.findDataById(info.id);
      if (rawData) {
        rawData.hobby = info.hobby;
        rawData.username = info.username;
        rawData.email = info.email;
        rawData.gender = info.gender;
      }
    },
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
    deleteData(index) {
      // 删除指定的数据
      this.formData.splice(index, 1);
    },
  },
};
</script>

<style></style>
