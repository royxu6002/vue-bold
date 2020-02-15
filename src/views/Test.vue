<template>
  <div>
    <ul id="v-for-object" class="demo">
      <li v-for="(value,key, index) in object" :key="key">
        {{key}}.{{ value }} {{index}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    };
  }
};
</script>
