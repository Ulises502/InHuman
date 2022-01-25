<template>
  <v-card elevation="2" width="300">
    <v-card-text>
      <p>
        Humanity: {{ humanity }}
        <span class="success--text mx-2">(+ {{ humanityPerSec }}/sec)</span>
        <v-btn small @click="live" class="mt-n1">Live</v-btn>
      </p>
      <v-divider class="mx-3 mb-3" v-show="virtueDividerShow"></v-divider>
      <p v-show="survivalShow">
        Survival: {{ virtues.survival.amount }}
        <span class="info--text mx-2"> ({{ virtues.survival.bought }}) </span
        ><v-chip
          small
          class="ms-3"
          @click="buy('survival')"
          :disabled="survivalBuyDisabled"
        >
          Cost: {{ virtues.survival.cost }}
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
      if (this.humanity >= this.virtues[virtue].cost) {
        this.$store.dispatch("game/buy", virtue);
      }
    },
  },
  computed: {
    ...mapState({
      humanity: (state) => state.player.humanity,
      humanityPerSec: (state) => state.player.humanityPerSec,
      virtues: (state) => state.player.virtues,
    }),

    // Show Section
    virtueDividerShow() {
      return this.survivalShow == true;
    },
    // Show the survival button if the player has enough humanity
    survivalShow() {
      return this.humanity >= 25 || this.virtues.survival.bought >= 1;
    },

    // Disabled section
    // Disable the button if the player doesn't have enough humanity
    survivalBuyDisabled() {
      return this.humanity < this.virtues.survival.cost;
    },
  },
};
</script>