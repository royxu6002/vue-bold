<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="a task to do"
      @keyup.enter="addToDoList"
      v-model="toDoItem"
    />
    <div class="input-group-append">
      <button class="btn btn-primary" @click.prevent="addToDoList">
        Add a task
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    addToList: Function
  },
  name: "ToDoHeader",
  data() {
    return {
      toDoItem: ""
    };
  },
  methods: {
    addToDoList() {
      let item = this.toDoItem.trim();
      if (!item) return alert("请输入 task");
      const data = {
        title: item,
        complete: false
      };
      // todolist 数据不在该组件上, 无法完成该逻辑
      this.addToList(data);
      this.toDoItem = "";
    }
  }
};
</script>
