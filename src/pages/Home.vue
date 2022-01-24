<template>
  <v-card elevation="2" width="300">
    <v-card-text>
      <p>
        Humanity: {{ humanity }}
        <span class="success--text mx-2">(+ {{ humanityPerSec }}/sec)</span>
        <v-btn small @click="live" class="mt-n1">Live</v-btn>
      </p>
      <v-divider class="mx-3 mb-3"></v-divider>
      <p>
        Survival: {{ survival.points }}
        <span class="info--text mx-2"> ({{ survival.amount }}) </span
        ><v-chip small class="ms-3" @click="buy('survival')"
          >Cost: {{ survival.cost }}
        </v-chip>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    live() {
      this.$store.dispatch("game/live");
    },
    buy(virtue) {
      this.$store.dispatch("game/buy", virtue);
    },
  },
  computed: {
    ...mapState({
      humanity: (state) => state.player.humanity,
      humanityPerSec: (state) => state.player.humanityPerSec,
      survival: (state) => state.player.survival,
    }),
  },
};
</script>