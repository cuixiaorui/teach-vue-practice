## 初识 vue - template 基础

### 知识点

1. mvvm 开发思想
2. vue 基础知识
3. 学会看 vue 文档

### 任务

- 实现基于本地数据渲染 table 表格（5 分）

- 列表数据可删除（5 分）

  - 点击删除按钮的时候，可以删除当前列的数据

## 组件化思想 -组件基础

### 知识点

1. 组件化思想
2. vue 组件基础知识点

### 任务

- 封装一个 ModifyPanel 的组件（2 分）
- 列表数据可修改（8 分）
  - 点击“修改按钮”的时候，可弹出“修改面板”（2 分）
  - 修改面板显示当前要修改的数据（2 分）
    - 保存（2 分）
      - 点击保存按钮后，当前用户数据会修改完成
      - 同时关闭“修改面板”
    - 取消（2 分）
      - 点击取消按钮后，“修改面板”将被关闭

## vue-cli 以及 vue 的单元测试

### 知识点

1. sfc
2. vue-cli
3. todo-list
4. 单元测试

### 任务

- 使用 SFC（单文件组件） 重构之前的逻辑 (6 分)
  - 封装成一下两个组件
    - UserForm
    - ModifyPanel
- 对 ModifyPanel 组件编写单元测试（4 分）
  - 点击取消的时候，验证是否发出 cancel 事件（2 分）
  - 点击保存的时候，验证是否发出 save 事件（2 分）

## vue 单页面应用 - vue-router

### 知识点

1. SPA
2. vue-router

### 任务

- 实现登录页面（4 分）

  - 登录成功后跳转到 Home 页
    - 不需要验证账号和密码，不为空即可
    - 用户账号保存到 localStorage 内

- 实现编辑页面（6 分）

  - 点击编辑按钮的时候跳转到编辑页面（3）
  - 点击“保存”按钮后，跳转到 Home 页面（3）
    - 无需保存修改后的数据

## vue 组件通信

### 知识点

1. 组件之间的通信方式
2. vuex 基础知识

### 任务

- 把之前的数据操作全部重构到 store 内（10 分）
  - 编辑（4）
  - 登录（3）
  - 删除（3）

## vue 相册实战

### 知识点

1. axios 在 vue 中的应用
2. 路由权限拦截
3. 前后端交互

### 任务

- 基于接口重构其逻辑，以下 action 全部请求后端完成（10 分）
  - 数据获取（4 分）
  - 数据编辑（更新）（3 分）
  - 数据删除（3 分）

## vue3 来袭

### 知识点

1. 认识 vue3 新特性
2. 掌握 composition api

### 任务

- 实现完整版 todo-list (10 分)
  - 可以通过输入框输入一个 todo（1 分）
  - 可以删除一个 todo（1 分）
  - 可以完成一个 todo （1 分）
    - 点击完成按钮后，当前 todo 的样式画个横线
  - all 按钮，显示所有 todo（3 分）
  - active 按钮，显示所有处于 active 状态下的所有 todo（2 分）
  - completed 按钮，显示所有处于 completed 状态下的所有 todo（2 分）
- 技术要求
  - 使用 vue3 的 composition api 方式编写逻辑
  - 使用 vuex
  - 使用 element3
    - 使用 button 组件即可

## custom-renderer Vue3 结合 Canvas

### 知识点

1. 掌握 custom renderer 的使用方式
2. 掌握 pixijs

### 任务

- 基于 custom renderer 实现小球的移动
  - 小球可以左右移动（5 分）
  - 碰到屏幕的时候会回弹（5 分）

## vue3 实现飞机大战

### 知识点

1. 基于 pixijs 的游戏实战

### 任务

- 可自动生成敌军飞机（3 分）
  - 1 秒创建一个
- 当敌军超出屏幕时，需要销毁（2 分）
- 当子弹超出屏幕时，需要销毁（2 分）
- 敌军需要打击两次才可以销毁（3 分）
  - 敌军血量值的概念

## 手写 mini-vue

### 知识点

1. 源码实现

### 任务

- 实现事件功能（5 分）
  - 在 props 中给定 onClick 之后，会自动给当前 el 添加 click 事件
- 通过 h 函数 + effect 完成 count double 的逻辑编写（5 分）
