<template>
  <div class="container test-page">
    <div style="display: flex; justify-content: space-around;">
      <router-link :to="{name: 'Sidebar'}">Sidebar Test</router-link>
    <router-link :to="{name: 'If'}">If</router-link>
    <router-link :to="{name: 'Algorithm'}">Algorithm</router-link>
    <router-link :to="{name: 'Form'}">Formdata</router-link>
    </div>
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
