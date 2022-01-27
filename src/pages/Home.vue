<template>
  <v-row>
        <!-- *********** BUTTONs CARD ************* -->
    <v-col cols="3">
      <v-card elevation="2">
        <v-card-text>
          <v-btn small @click="live" class="mt-n1">Live <v-icon right>mdi-account-multiple</v-icon></v-btn>
          <v-btn small class="mt-n1 ms-2" v-show="false">Ruins <v-icon right>mdi-gate-open</v-icon></v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- *********** VIRTUE CARD ************* -->
    <v-col cols="3">
      <v-card elevation="2">
        <v-card-text>
          <p>
            Humanity:
            {{ humanity.lt(25) ? humanity.toFixed(2) : humanity.toFixed(0) }}
            <span class="success--text mx-2">(+ {{ humanityPerSec }}/sec)</span>
          </p>
          <v-divider
            class="mx-3 mb-3"
            v-show="showVirtue('Survival')"
          ></v-divider>
          <div v-for="virtue in virtues" v-bind:key="virtue.name">
            <div v-show="showVirtue(virtue.name)">
              {{ virtue.name }}: {{ virtue.amount }}
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
    </v-col>

    <!-- *********** TEXT AREA CARD ************* -->
    <v-col cols="3" v-show="showVirtue('Survival')">
      <v-card elevation="2">
        <v-card-text>
          <v-textarea
            v-model="ruins"
            outlined
            disabled
            no-resize
            rows="15"
            name="input-7-4"
            label="Stories"
          ></v-textarea>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
      if (this.humanity.gte(this.virtues[virtue].cost)) {
        this.$store.dispatch("game/buy", virtue);
      }
    },

    // **************Show Section**************
    // show virtue when bought or have enough humanity
    showVirtue(name) {
      return (
        this.humanity.gte(this.virtues[name].cost / 2) ||
        this.virtues[name].bought.gte(1)
      );
    },
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