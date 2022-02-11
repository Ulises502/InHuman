<template>
  <div>
    <v-card-subtitle class="pb-0 font-weight-medium text-center text-subtitle-1"
      >-- Survival --</v-card-subtitle
    >
    <v-card-text>
      <v-row>
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
                virtueUpgraded.Survival[upgrade.name].bought
                  ? 'secondary'
                  : 'null'
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
      this.$store.dispatch("game/buyUpgrade", { id: id, type: "Survival" });
    },
  },
  computed: {
    ...mapState({
      virtueUpgrades: (state) => state.game.virtueUpgrades,
      virtueUpgraded: (state) => state.player.virtueUpgraded,
      humanity: (state) => new Decimal(state.player.humanity),
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