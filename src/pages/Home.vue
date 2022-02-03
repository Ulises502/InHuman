<template>
  <v-row>
    <!-- *********** BUTTONs CARD ************* -->
    <v-col cols="3">
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
            >Ruins <v-icon right>mdi-gate-open</v-icon></v-btn
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
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- *********** TEXT AREA CARD ************* -->
    <v-col cols="3" v-show="ruins.gte(1)">
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

    <!-- *********** CHALLENGES CARD ************* -->
    <v-col cols="2" v-show="virtues.Survival.bought.gte(10)">
      <v-card elevation="2">
        <v-card-text>
          <h3 class="mb-2">Virtue Challenges</h3>
          <v-col class="fill-width" align="center" justify="center">
            <template v-for="(challenge, i) in challenges">
              <v-row :key="i">
                <v-hover v-slot="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
                    class="challange"
                  >
                    <v-img :src="challenge.img" height="200px">
                      <v-card-title class="text-h6 white--text">
                        <v-row
                          class="fill-height flex-column"
                          justify="space-between"
                        >
                          <p class="mt-4 subheading text-left">
                            {{ challenge.title }}
                          </p>

                          <div>
                            <p
                              class="
                                ma-0
                                text-body-1
                                font-weight-bold font-italic
                                text-left
                              "
                            >
                              {{ challenge.text }}
                            </p>
                            <p
                              class="
                                text-caption
                                font-weight-medium font-italic
                                text-left
                              "
                            >
                              {{ challenge.subtext }}
                            </p>
                          </div>

                          <div class="align-self-center">
                            <v-btn
                              v-for="(icon, index) in icons"
                              :key="index"
                              :class="{ 'show-btns': hover }"
                              :color="transparent"
                              icon
                            >
                              <v-icon
                                :class="{ 'show-btns': hover }"
                                :color="transparent"
                              >
                                {{ icon }}
                              </v-icon>
                            </v-btn>
                          </div>
                        </v-row>
                      </v-card-title>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-row>
            </template>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import Decimal from "decimal.js";

export default {
  data: () => ({
    icons: ["mdi-play"],
    transparent: "rgba(255, 255, 255, 0)",
  }),
  methods: {
    ruin() {
      this.$store.dispatch("game/ruin");
    },
    live() {
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
      return this.humanity.gte(1);
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
      messages: (state) => state.game.messages,
      challenges: (state) => state.game.challenges,
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

.v-card.challange {
  transition: opacity 0.4s ease-in-out;
}

.v-card.challange:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>