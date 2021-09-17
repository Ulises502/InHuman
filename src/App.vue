<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    this.$store.dispatch('get_save');
    this.$store.dispatch('startInterval');
    this.$store.dispatch('saveInterval');
  }
};
</script>
