<template>
  <div>
    <v-card-subtitle class="font-weight-medium text-center text-subtitle-1"
      >-- Knowledge --</v-card-subtitle
    >
    <v-img
      class="d-flex align-center text-center"
      height="300px"
      src="https://picsum.photos/510/300?random"
      :gradient="
        $vuetify.theme.dark
          ? 'to bottom, rgba(30,30,30,0.6), rgba(30,30,30,0.6)'
          : 'to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.5)'
      "
    >
      <v-card-text class="text-uppercase">Progress</v-card-text>
      <v-row class="align-center justify-center">
        <v-avatar size="250" class="mt-n5">
          <v-row class="align-center justify-center">
            <v-sheet
              rounded="circle"
              class="mx-auto align-center justify-center"
              height="150"
              width="150"
            >
              <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="25"
                :value="virtueUpgraded.Knowledge.progress.toString()"
                :color="$vuetify.theme.dark ? '#fff' : '#000'"
                class="align-center justify-center"
              >
                {{ virtueUpgraded.Knowledge.progress }} %
              </v-progress-circular></v-sheet
            >
          </v-row>
        </v-avatar>
      </v-row>
    </v-img>

    <v-card elevation="8" class="mx-10 mt-n5 mb-5">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <p class="mb-0 font-weight-bold text-center text-h6"> {{virtueUpgraded.Knowledge.observations}} </p>
            <p
              class="
                mb-0
                font-weight-regular
                text-center text-caption text--disabled
              "
            >
              Observations
            </p>
          </v-col>
          <v-col cols="6">
            <p class="mb-0 font-weight-bold text-center text-h6"> {{techs}} </p>
            <p
              class="
                mb-0
                font-weight-regular
                text-center text-caption text--disabled
              "
            >
              Techs
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card-text>
      <v-row>
        <v-col cols="6" class="d-flex align-center">
          <v-btn block @click="discover()">Discover</v-btn>
        </v-col>
        <v-col cols="6">
          <p
            class="mb-0 font-weight-medium text-center text--secondary text-h6"
          >
            x {{virtueUpgraded.Knowledge.discoveryBonus.toFixed(2)}}
          </p>
          <p
            class="
              mb-0
              font-weight-regular
              text-center text-caption text--disabled
            "
          >
            Knowledge Bonus
          </p>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text
      v-for="tech in virtueUpgrades.Knowledge"
      v-bind:key="tech.name"
    >
      <v-card @click="buyTech()" v-show="virtues.Knowledge.bought.gt(tech.cost.dividedBy(2))" elevation="8">
        <v-card-text
          class="font-weight-medium text-center text--primary text-uppercase"
        >
          {{ tech.name }} <v-icon>{{ tech.icon }} </v-icon>
          <p
            class="
              mb-0
              font-weight-regular
              text-center text-caption text--disabled
            "
          >
            Unlock: {{ tech.cost }} Knowledge
          </p>
        </v-card-text>
      </v-card>
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    discover() {
      this.$store.dispatch("player/discover");
    },
    buyTech() {
      //this.$store.dispatch("game/buyTech");
    },
  },
  computed: {
    ...mapState({
      virtueUpgrades: (state) => state.game.virtueUpgrades,
      virtueUpgraded: (state) => state.player.virtueUpgraded,
      virtues: (state) => state.player.virtues,
    }),
    techs() {
      return this.$store.getters['player/countTechs'];
    },
  },
};
</script>