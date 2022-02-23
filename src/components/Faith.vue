<template>
  <div class="text-center">
    <v-card-subtitle
      class="pb-0 mb-2 font-weight-medium text-center text-subtitle-1"
    >
      -- Faith --
    </v-card-subtitle>
    <v-card-text>
      <v-avatar size="150">
        <img src="https://picsum.photos/510/300?random" alt="Altar" />
      </v-avatar>
      <p class="mt-2">
        Gain multiplier to Faith<v-icon color="accent" class="mt-n1 ms-2"
          >mdi-bird</v-icon
        >
        <span class="font-weight-regular text-center text-subtitle-2"
          >x {{ faithBonus }}
        </span>
      </p>
      <v-select
        v-model="sacrifice"
        background-color="accent"
        :items="items"
        label="Sacrifice"
        hint="Offer a sacrifice"
        persistent-hint
        solo
      ></v-select>
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      items: ["Humanity", "Survival", "Might"],
    };
  },
  computed: {
    faithBonus: {
      // getter
      get: function () {
        return this.$store.state.player.virtueUpgraded.Faith.faithBonus;
      },
      // setter
      set: function (newValue) {
        this.$store.commit("player/setFaithBonus", { amount: newValue });
      },
    },
    sacrifice: {
      // getter
      get: function () {
        return this.$store.state.player.virtueUpgraded.Faith.sacrifice;
      },
      // setter
      set: function (newValue) {
        this.$store.commit("player/setFaithSacrifice", { amount: newValue });
        this.$store.dispatch("game/loopSacrifice", newValue);
      },
    },
    ...mapState({
      virtueUpgraded: (state) => state.player.virtueUpgraded,
    }),
  },
  watch: {
    sacrifice(newValue) {
      if (newValue) {
        this.faithBonus = this.virtueUpgraded.Faith.bonus[newValue];
      }
    },
  },
};
</script>