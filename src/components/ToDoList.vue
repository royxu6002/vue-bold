<template>
  <div
    class="input-group form-control justify-content-between mb-2"
    :style="{ 'background-color': bgColor }"
    @mouseleave="mousecoming(false)"
    @mouseenter="mousecoming(true)"
  >
    <div>
      <input type="checkbox" v-model="todolistitem.complete" />
      <label class="pl-3" for="">{{ todolistitem.title }}</label>
    </div>
    <button
      class="btn btn-primary"
      v-if="isShow"
      @click="deleteListItem(index)"
    >
      Delete
    </button>
  </div>
</template>
<script>
export default {
  props: {
    todolistitem: Object,
    index: Number,
    deleteItem: Function
  },
  name: "ToDoList",
  data() {
    return {
      isShow: false,
      bgColor: "white"
    };
  },
  methods: {
    mousecoming(isEnter) {
      if (isEnter) {
        this.isShow = true;
        this.bgColor = "#cccccc";
      } else {
        this.isShow = false;
        this.bgColor = "white";
      }
    },
    deleteListItem(index) {
      if (window.confirm(`删除${this.todolistitem.title}?`)) {
        this.deleteItem(index);
      }
    }
  }
};
</script>
<style></style>
