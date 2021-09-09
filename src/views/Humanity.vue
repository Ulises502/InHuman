<template>
  <div>
    <v-container class="py-0">
      <!-- -->
      <!-- HUMANITY -->
      <div class="text-center text-h6 text-md-h4 mb-2">
        Humanity {{ humanity }}
      </div>
      <v-row>
        <!-- WELLBEING -->
        <v-col cols="8" class="d-inline-flex">
          <div class="text-body-2 text-md-body-1 mt-1">
            Wellbeing {{ wellbeing }}
          </div>
          <v-btn
            elevation="3"
            small
            class="ms-4"
            :disabled="humanity < wellbeing_cost"
          >
            <div style="font-size: 10px">
              <p class="ma-0 pa-0">Cost:</p>
              <p class="ma-0 pa-0">{{ wellbeing_cost }} H</p>
            </div>
          </v-btn>
        </v-col>

        <v-col cols="4" class="text-center">
          <p class="text-caption text-md-body-2 ma-0">You are making</p>
          <p class="text-caption text-md-body-2 ma-0">
            {{ total_humanity_persec }} Humanity /s
          </p>
        </v-col>
      </v-row>

      <!-- VIRTUES TABLE -->
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Virtues</th>
              <th></th>
              <th class="text-center">Humanity /s</th>
              <th class="text-center">Buy</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in virtues" :key="row.name">
              <td>
                <!-- VIRTUES NAME -->
                <p class="text-caption text-md-body-2 ma-0 text-center">
                  {{ row.name }}
                </p>
                <p class="text-caption text-md-body-2 ma-0 text-center">
                  ({{ row.quantity }})
                </p>
              </td>
              <td class="d-flex flex-column justify-center">
                <!-- MOMENTUM & BONUS -->
                <p
                  class="
                    d-none d-sm-flex
                    text-caption text-md-body-2
                    ma-0
                    justify-center
                  "
                >
                  Momentum: {{ row.momentum }}
                </p>
                <p
                  class="
                    d-flex d-sm-none
                    text-caption text-md-body-2
                    ma-0
                    justify-center
                  "
                >
                  Motm: {{ row.momentum }}
                </p>
                <v-divider />
                <div class="d-flex justify-center">
                  <v-chip label small class="my-1">x {{ row.bonus }} </v-chip>
                </div>
              </td>
              <td>
                <!-- HUMANITY PER SEC -->
                <p class="text-caption text-md-body-2 ma-0 text-center">
                  {{ row.h_per_sec }} /s
                </p>
              </td>
              <td>
                <!-- BUY VIRTUE BUTTON -->
                <v-btn
                  elevation="5"
                  small
                  block
                  class="mx-2"
                  :disabled="humanity.lt(row.cost)"
                  @click="buyVirtue(row.name)"
                >
                  <div style="font-size: 10px">
                    <p class="ma-0 pa-0">Cost:</p>
                    <p class="ma-0 pa-0">{{ row.cost }} H</p>
                  </div>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- VIRTUES BONUS -->
      <v-row class="my-2 d-flex justify-center">
        <v-chip class="ma-2" color="success" small outlined>
          BONUS: + {{ virtues_bonus }} %
        </v-chip>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <!-- CHALLENGES MISSIONs -->
      <div class="text-subtitle-2 text-md-h5 mb-4">Challenges</div>
      <v-row>
        <v-col cols="4">
          <v-btn block elevation="8" large class="text-caption text-md-button">
            Catastrophe<v-icon class="ms-2">mdi-weather-lightning</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8"></v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-btn block elevation="8" large class="text-caption text-md-button">
            Ruins<v-icon class="ms-2">mdi-gate-open</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import game from "@/init.js";
import Decimal from "decimal.js";

export default {
  data() {
    return {
      gameLoopIntervalID: null,
      humanity: new Decimal(10),
      wellbeing: 0,
      wellbeing_cost: 1234567,
      total_humanity_persec: 12345,
      virtues_bonus: 256,

      virtues: [
        {
          name: "Survival",
          quantity: 0,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 112,
        },
        {
          name: "Military",
          quantity: 0,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 4523,
        },
        {
          name: "Knowledge",
          quantity: 0,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 7587,
        },
        {
          name: "Culture",
          quantity: 0,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 45,
        },
        {
          name: "Cooperation",
          quantity: 0,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 12354,
        },
        {
          name: "Faith",
          quantity: 0,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234,
        },
        {
          name: "Ethics",
          quantity: 0,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 123,
        },
      ],
    };
  },

  methods: {
    startInterval() {
      this.gameLoopIntervalID = setInterval(
        this.cycle,
        game.options.updateRate
      );
    },

    cycle() {
      var i;
      for (i = 1; i < 8; i++) {
        this.humanity = this.humanity.plus(this.getVirtueProductionPerSec(i));
      }
    },

    getVirtueProductionPerSec(tier) {
      var name = game.VIRTUES_NAMES[tier];
      var quan = new Decimal(this.virtues.find(
        (virtue) => virtue.name === name
      ).quantity);
      console.log(quan.toNumber());
      return quan;
    },

    buyVirtue(name) {
      this.humanity = this.humanity.sub(
        this.virtues.find((virtue) => virtue.name === name).cost
      );
      this.virtues.find((virtue) => virtue.name === name).quantity++;
    },
  },

  mounted() {
    this.humanity = game.humanity;
    this.virtues[0].cost = game.survival_cost;

    this.startInterval();
  },
};
</script>