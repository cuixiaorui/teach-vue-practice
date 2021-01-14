<template>
  <div v-if="visible">
    <div class="content">
      <table>
        <tr>
          <td>用户名</td>
          <td><input type="text" v-model="username" /></td>
        </tr>
        <tr>
          <td>邮箱</td>
          <td><input type="text" v-model="email" /></td>
        </tr>

        <tr>
          <td>性别</td>
          <td>
            <label>
              <input type="radio" name="sex" value="男" v-model="gender" />男
            </label>
            <label
              ><input
                type="radio"
                name="sex"
                value="女"
                v-model="gender"
              />女</label
            >
            <label
              ><input
                type="radio"
                name="sex"
                value="未知"
                v-model="gender"
              />未知</label
            >
          </td>
        </tr>

        <tr>
          <td>爱好</td>
          <td>
            <label
              ><input type="checkbox" value="篮球" v-model="hobby" />篮球</label
            >
            <label
              ><input type="checkbox" value="读书" v-model="hobby" />读书</label
            >
            <label
              ><input type="checkbox" value="插画" v-model="hobby" />插画</label
            >
            <label
              ><input type="checkbox" value="编程" v-model="hobby" />编程</label
            >
            <label
              ><input type="checkbox" value="弹琴" v-model="hobby" />弹琴</label
            >
          </td>
        </tr>
      </table>

      <p>
        <button @click="cancel" data-testid="cancel">取消</button>
        <button @click="save" data-testid="save">保存</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "visible"],
  watch: {
    item: {
      handler(val) {
        if (val) {
          this.username = val.username;
          this.hobby = val.hobby;
          this.email = val.email;
          this.gender = val.gender;
        }
      },
      immediate: true,
    },
  },
  methods: {
    cancel() {
      // 直接关闭当前面板即可
      this.$router.push({
        name: "Home",
      });
    },
    save() {
      const payload = {
        id: this.item.id,
        hobby: this.hobby,
        email: this.email,
        gender: this.gender,
        username: this.username,
      };
      this.$store.commit("modifyForm", payload);

      this.$router.push({
        name: "Home",
      });
    },
  },
  data() {
    return {
      hobby: "",
      username: "",
      email: "",
      gender: "",
    };
  },
};
</script>

<style></style>
