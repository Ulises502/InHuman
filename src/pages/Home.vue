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
                Cost:
                {{
                  virtue.cost.lt(10000)
                    ? virtue.cost.toFixed(0)
                    : virtue.cost.toExponential()
                }}
                H
              </v-chip>
            </div>
          </div>
        </v-card-text>
        <v-card-actions v-show="virtues.Survival.amount.gte(100)">
          <v-btn block outlined text tile> Virtue Challange </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- *********** VIRTUE'S UPGRADES CARD ************* -->
    <v-col cols="12" sm="6" md="3" v-show="virtues.Survival.bought.gte(1)">
      <v-card elevation="2">
        <v-card-title>Virtue Upgrade</v-card-title>
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
    // show virtue when bought or have enough humanity
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