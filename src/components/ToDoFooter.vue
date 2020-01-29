<template>
  <div class="my-1 justify-content-between input-group">
    <div>
      <input type="checkbox" v-model="isAllChecked" />
      <label class="pl-3" for=""
        >total {{ todolist.length }} tasks / {{ completedSize }} finished
        tasks</label
      >
    </div>
    <button
      class="btn btn-primary clearfix"
      v-show="completedSize"
      @click="deleteCompleteListItem"
    >
      Clear finished tasks
    </button>
  </div>
</template>
<script>
export default {
  name: "ToDoFooter",
  props: {
    todolist: Array,
    deleteCompleteListItem: Function,
    selectAllListItem: Function
  },
  computed: {
    completedSize() {
      return this.todolist.reduce(
        (pre, next) => pre + (next.complete ? 1 : 0),
        0
      );
    },
    isAllChecked: {
      get() {
        return (
          this.completedSize === this.todolist.length && this.completedSize != 0
        );
      },
      set(value) {
        // value 由 checkout 决定
        return this.selectAllListItem(value);
      }
    }
  }
};
</script>
<style></style>
