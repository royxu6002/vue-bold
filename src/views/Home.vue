<template>
  <div class="container mt-3">
    <div class="nav container">
      <router-link to="/faq">FAQ</router-link>
      <router-link to="/customer">Customers</router-link>
      <router-link to="/client">客户</router-link>
      <router-link to="/invoice">Invoice</router-link>
      <router-link to="/transaction">Transaction</router-link>
      <router-link to="/shipment">Shipment</router-link>
      <router-link to="/quotation">Quotation</router-link>
      <router-link to="/test">Test</router-link>
    </div>
    <div class="card text-white bg-primary">
      <div class="card-header">
        <!-- add to-do-item -->
        <ToDoHeader :addToList="addToList" />
      </div>

      <div class="card-body">
        <!-- list-item -->
        <ToDoList
          v-for="(todolistitem, index) in todolist"
          :todolistitem="todolistitem"
          :key="index"
          :index="index"
          :deleteItem="deleteItem"
        />
      </div>
    </div>

    <!-- footer -->
    <ToDoFooter
      :todolist="todolist"
      :deleteCompleteListItem="deleteCompleteListItem"
      :selectAllListItem="selectAllListItem"
    />
  </div>
</template>

<script>
import ToDoHeader from "../components/ToDoHeader.vue";
import ToDoList from "@/components/ToDoList.vue";
import ToDoFooter from "@/components/ToDoFooter.vue";
export default {
  name: "home",
  components: {
    ToDoHeader,
    ToDoList,
    ToDoFooter
  },
  data() {
    return {
      // read data from localStorage
      todolist: JSON.parse(window.localStorage.getItem("todolist_key") || "[]")
    };
  },
  watch: {
    todolist: {
      // 深度监视
      deep: true,
      // 将 todolist 存储到 localStorage
      handler: function(value) {
        window.localStorage.setItem("todolist_key", JSON.stringify(value));
      }
    }
  },
  methods: {
    addToList(item) {
      this.todolist.unshift(item);
    },
    deleteItem(index) {
      this.todolist.splice(index, 1);
    },
    deleteCompleteListItem() {
      this.todolist = this.todolist.filter(item => !item.complete);
    },
    selectAllListItem(isChecked) {
      this.todolist.forEach(item => {
        item.complete = isChecked;
      });
    }
  }
};
</script>
<style></style>
