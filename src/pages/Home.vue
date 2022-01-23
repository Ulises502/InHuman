<template>
  <div>
    <p>Humanity: {{ humanity }}</p>
    <v-btn @click="contar">Contar</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    contar() {
      this.$store.dispatch({
        type: "incrementAsync",
        amount: 10,
      });
    },
  },
  computed: {
    humanity() {
      return this.$store.state.player.humanity;
    },
    count() {
      return this.$store.state.count;
    },
    doneTodosCount() {
      return this.$store.getters.doneTodosCount;
    },
  },
  mounted() {
    // calls the action startInterval inside game module (which is namespaced)
    this.$store.dispatch("game/startInterval");
  },
};
</script>