<template>
  <v-card elevation="2" width="300">
    <v-card-text>
      <p>
        Humanity: {{ humanity }}
        <span class="text--success ms-2">(+ {{ humanityPerSec }}/sec)</span>
      </p>
      <v-btn small @click="contar">Live</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
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
    ...mapState({
      humanity: (state) => state.player.humanity,
      humanityPerSec: (state) => state.player.humanityPerSec,
    }),
  },
  mounted() {
    // calls the action startInterval inside game module (which is namespaced)
    this.$store.dispatch("game/startInterval");
  },
};
</script>