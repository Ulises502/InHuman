<template>
  <v-card elevation="2" width="300">
    <v-card-text>
      <p>
        Humanity: {{ humanity }}
        <span class="success--text mx-2">(+ {{ humanityPerSec }}/sec)</span>
        <v-btn small @click="live" class="mt-n1">Live</v-btn>
      </p>
      <v-divider class="mx-3 mb-3" v-show="showVirtue('Survival')"></v-divider>
      <div v-for="virtue in virtues" v-bind:key="virtue.name">
        <div v-show="showVirtue(virtue.name)">
          {{virtue.name}} : {{ virtue.amount }}
          <span class="info--text mx-2"> ({{ virtue.bought }}) </span
          ><v-chip
            small
            class="ms-3"
            @click="buy(virtue.name)"
            :disabled="humanity.lt(virtue.cost)"
          >
            Cost: {{ virtue.cost }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import Decimal from "decimal.js";

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

    // **************Show Section**************
    showVirtue(name) {
      return this.humanity.gte(this.virtues[name].cost/2) || this.virtues[name].bought.gte(1);
    }
  },
  computed: {
    ...mapState({
      humanity: (state) => new Decimal(state.player.humanity),
      humanityPerSec: (state) => new Decimal(state.player.humanityPerSec),
      virtues: (state) => state.player.virtues,
    }),

  },
  /*watch: {
    // Watch for changes in humanity; shows virtues that can be bought
    humanity() {
      for (let name in this.virtues) {
        if (this.humanity.gte(this.virtues[name].cost/2)) {
          this.$store.dispatch("player/showVirtue", name);
        }
      }
    }
  }*/
};
</script>