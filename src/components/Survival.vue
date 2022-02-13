<template>
  <div>
    <v-img
      class="align-start"
      height="300px"
      src="https://picsum.photos/510/300?random"
      :gradient="
        $vuetify.theme.dark
          ? 'to bottom, rgba(30,30,30,1), rgba(0,0,0,0.4) 30%, rgba(30,30,30,1)'
          : 'to bottom, rgba(255,255,255,1), rgba(255,255,255,0.4) 25%, rgba(255,255,255,1)'
      "
    >
      <v-card-subtitle
        class="pb-0 font-weight-medium text-center text-subtitle-1"
        >-- Survival --</v-card-subtitle
      >
      <v-card elevation="5" class="mx-10 mt-5">
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <p class="mb-0 font-weight-medium text-center text-h6">
                {{ lived }}
              </p>
              <p
                class="
                  mb-0
                  font-weight-regular
                  text-center text-caption text--disabled
                "
              >
                Deaths
              </p>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="4"></v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-img>
    <v-card-text>
      <v-row class="mt-n16">
        <v-col
          cols="6"
          v-for="upgrade in virtueUpgrades.Survival"
          v-bind:key="upgrade.name"
        >
          <v-hover v-slot="{ hover }" :disabled="!humanity.gte(upgrade.cost)">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto mt-n8"
              :color="
                virtueUpgraded.Survival[upgrade.name].bought ? 'accent' : 'null'
              "
              height="150"
              @click="buyUpgrade(upgrade.name)"
            >
              <v-card-text
                class="font-weight-medium mt-12 text-center text-subtitle-1"
              >
                {{ upgrade.name }} <v-icon>{{ upgrade.icon }}</v-icon>
                <p class="text-body-2 mt-2">Cost: {{ upgrade.cost }} H</p>
                <p class="text-caption">{{ upgrade.description }}</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Decimal from "decimal.js";

export default {
  methods: {
    buyUpgrade(id) {
      if (this.humanity.gte(this.virtueUpgrades.Survival[id].cost)) {
        this.$store.dispatch("game/buyUpgrade", { id: id, type: "Survival" });
      }
    },
  },
  computed: {
    ...mapState({
      virtueUpgrades: (state) => state.game.virtueUpgrades,
      virtueUpgraded: (state) => state.player.virtueUpgraded,
      humanity: (state) => new Decimal(state.player.humanity),
      lived: (state) => new Decimal(state.player.lived),
    }),
  },
};
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000

.v-card.on-hover.theme--light
  background-color: rgba(#000, 0.8)
  >.v-card__text
    color: #FFF
</style>