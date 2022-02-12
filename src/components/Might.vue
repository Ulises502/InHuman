<template>
  <div>
    <v-card-subtitle class="pb-0 font-weight-medium text-center text-subtitle-1"
      >-- Might --</v-card-subtitle
    >
    <v-card-text>
      <div class="text--secondary text-center mb-5">Distribute troops to increase Humanity production from Survival (Defence) or Might (Attack). Effect is based on current Might.</div>

      <v-slider
        v-model="mightBonus"
        :color="color"
        track-color="grey"
        always-dirty
        min="0"
        max="100"
      >
        <template v-slot:prepend>
          <v-icon :color="color" @click="decrement">
            mdi-shield-outline
          </v-icon>
        </template>

        <template v-slot:append>
          <v-icon :color="color" @click="increment"> mdi-sword-cross </v-icon>
        </template>
      </v-slider>
    </v-card-text>
  </div>
</template>

<script>
export default {
  methods: {
    decrement() {
      this.mightBonus--;
    },
    increment() {
      this.mightBonus++;
    },
  },
  computed: {
    color() {
      if (this.mightBonus < 20) return "indigo";
      if (this.mightBonus < 40) return "teal";
      if (this.mightBonus < 60) return "green";
      if (this.mightBonus < 80) return "orange";
      return "red";
    },
    mightBonus: {
      // getter
      get: function () {
        return this.$store.state.player.virtueUpgraded.Might.mightBonus;
      },
      // setter
      set: function (newValue) {
        this.$store.commit("player/setMightBonus", {amount: newValue});
      },
    },
  },
};
</script>