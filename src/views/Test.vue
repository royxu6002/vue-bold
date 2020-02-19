<template>
  <div class="container test-page">
    <router-link :to="{name: 'Sidebar'}">Sidebar Test</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  }
};
</script>
<style>
</style>
