<template>
  <div>
    <p>{{ count }} : {{ doneTodosCount }}</p>
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
    count() {
      return this.$store.state.count;
    },
    doneTodosCount() {
      return this.$store.getters.doneTodosCount;
    },
  },
};
</script>