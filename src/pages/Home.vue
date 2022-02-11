<template>
  <v-row>
    <!-- *********** BUTTONs CARD ************* -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2">
        <v-card-text>
          <v-btn small @click="live" class="mt-n1" v-show="showLive()"
            >Live <v-icon right>mdi-account-multiple</v-icon></v-btn
          >
          <v-btn
            small
            color="error"
            class="mt-n1 ms-2"
            v-show="showRuin()"
            @click="ruin"
            >Explore Ruins <v-icon right>mdi-gate-open</v-icon></v-btn
          >
        </v-card-text>
      </v-card>

      <!-- *********** VIRTUE CARD ************* -->
      <v-card elevation="2" v-show="showHumanity()" class="mt-2">
        <v-card-text>
          <p>
            Humanity:
            {{
              humanity.lt(10)
                ? humanity.toFixed(2)
                : humanity.lt(100)
                ? humanity.toFixed(1)
                : humanity.toFixed(0)
            }}
            <span class="success--text mx-2">(+ {{ humanityPerSec }}/sec)</span>
          </p>
          <v-divider
            class="mx-3 mb-3"
            v-show="showVirtue('Survival')"
          ></v-divider>
          <v-row
            v-for="virtue in virtues"
            v-bind:key="virtue.name"
            v-show="showVirtue(virtue.name)"
          >
            <v-col cols="5" class="py-1 px-0">
              <v-list dense nav class="pa-0">
                <v-list-item-group v-model="selectedVirtue" color="primary">
                  <v-list-item :to="'/' + virtue.name.toLowerCase()">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ virtue.name }}: {{ virtue.amount }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="7" class="py-1 px-0 ps-2">
              <div
                v-show="showVirtue(virtue.name)"
                class="mt-2"
              >
                <span class="info--text me-1"> ({{ virtue.bought }}) </span
                ><v-chip
                  small
                  class="ms-3"
                  @click="buy(virtue.name)"
                  :disabled="humanity.lt(virtue.cost)"
                >
                  Cost:
                  {{
                    virtue.cost.lt(10000)
                      ? virtue.cost.toFixed(0)
                      : virtue.cost.toExponential()
                  }}
                  H
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions v-show="virtues.Survival.amount.gte(20)">
          <v-card block outlined text tile @click="softReset(virtueReset)" width="100%" class="text-center">
            <p class="text-uppercase mb-1">Virtue Challange</p>
            <p class="text-caption mb-0">Cost: 50 Survival</p>
          </v-card>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- *********** VIRTUE'S UPGRADES CARD ************* -->
    <v-col cols="12" sm="6" md="3" v-show="virtues.Survival.bought.gte(1)">
      <v-card elevation="2">
        <v-card-title class="pb-0">Virtue Upgrade</v-card-title>
        <router-view></router-view>
      </v-card>
    </v-col>

    <!-- *********** TEXT AREA CARD ************* -->
    <v-col cols="12" sm="6" md="3" v-show="ruins.gte(1)">
      <v-card elevation="2">
        <v-card-text>
          <v-textarea
            v-model="messages"
            outlined
            readonly
            no-resize
            rows="15"
            name="input-7-4"
            label="Campfire Stories"
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
  data() {
    return {
      selectedVirtue: "",
    };
  },
  methods: {
    ruin() {
      this.$store.dispatch("game/ruin");
    },
    live() {
      if (this.lived.equals(0)) {
        this.$store.dispatch(
          "game/sendMessage",
          "- People live. People die.\n"
        );
      }
      this.$store.dispatch("game/live");
    },
    buy(virtue) {
      if (this.humanity.gte(this.virtues[virtue].cost)) {
        this.$store.dispatch("game/buy", virtue);
      }
      // show message if first survival bought
      if (this.virtues.Survival.amount.equals(1)) {
        this.$store.dispatch(
          "game/sendMessage",
          "- People's first instict is to survive.\n"
        );
      }
    },
    softReset(resetNumber) {
      this.$store.dispatch("game/softReset", resetNumber);
    },

    // **************Show Section**************
    // show live button
    showLive() {
      return this.ruins.gte(1);
    },
    showRuin() {
      return this.ruins.lt(1);
    },
    // show humanity count
    showHumanity() {
      return this.humanity.gt(0);
    },
    // show virtue when bought or have half of its cost
    showVirtue(name) {
      return (
        (this.humanity.gte(this.virtues[name].cost / 2) &&
          this.virtues[name].show) ||
        this.virtues[name].bought.gte(1)
      );
    },
  },
  computed: {
    ...mapState({
      humanity: (state) => new Decimal(state.player.humanity),
      humanityPerSec: (state) => new Decimal(state.player.humanityPerSec),
      ruins: (state) => new Decimal(state.player.ruins),
      virtues: (state) => state.player.virtues,
      lived: (state) => state.player.lived,
      virtueReset: (state) => state.player.virtueReset,

      messages: (state) => state.game.messages,
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

<style scoped>
.v-textarea {
  font-size: 1em;
}
</style>