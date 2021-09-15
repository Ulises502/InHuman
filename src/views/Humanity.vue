<template>
  <div>
    <v-container class="py-0">
      <!-- -->
      <!-- HUMANITY -->
      <div class="text-center text-h6 text-md-h4 mb-2">
        Humanity
        {{ humanity_with_decimals ? humanity.toFixed(1) : humanity.trunc() }}
      </div>
      <v-row>
        <!-- WELLBEING -->
        <v-col cols="8" class="d-inline-flex justify-center">
          <div class="d-inline-flex">
            <div class="text-body-2 text-md-body-1 mt-1" v-show="collapse1">
              Wellbeing {{ wellbeing }}
            </div>
            <v-btn
              v-show="collapse1"
              elevation="3"
              small
              class="ms-4"
              :disabled="humanity.lessThan(wellbeing_cost)"
            >
              <div style="font-size: 10px">
                <p class="ma-0 pa-0">Cost:</p>
                <p class="ma-0 pa-0">{{ wellbeing_cost }} H</p>
              </div>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="4">
          <p class="text-caption text-md-body-2 ma-0">You are making</p>
          <p class="text-caption text-md-body-2 ma-0">
            {{ total_humanity_persec }} Humanity /s
          </p>
        </v-col>
      </v-row>

      <!-- ************************************************
        ****************** VIRTUES TABLE ****************** -->
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Virtues</th>
              <th class="text-center">Momentum/Bonus</th>
              <th class="text-center">Humanity/s</th>
              <th class="text-center">Buy</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in virtues"
              :key="row.name"

            >
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
                <div v-show="collapse1">
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
                </div>
                <div class="d-flex justify-center">
                  <div>
                    <v-chip
                      label
                      small
                      color="secondary"
                      class="my-1"
                      >x {{ row.multiplier }}
                    </v-chip>
                  </div>
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
                  color="primary"
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
      <div v-show="collapse1">
        <v-row class="my-2 d-flex justify-center">
          <v-chip class="ma-2" color="success" small outlined>
            BONUS: + {{ virtues_bonus }} %
          </v-chip>
        </v-row>
      </div>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <!-- **************************************************************
      ******************** CHALLENGES MISSIONs ************************** -->
      <div v-show="collapse1">
        <div class="text-subtitle-2 text-md-h5 mb-4">Challenges</div>
        <v-row>
          <v-col cols="4">
            <v-btn
              block
              elevation="8"
              large
              class="text-caption text-md-button"
              color="terciary"
            >
              Catastrophe<v-icon class="ms-2">mdi-weather-lightning</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="8"></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-btn
              block
              elevation="8"
              large
              class="text-caption text-md-button"
              color="terciary"
            >
              Ruins<v-icon class="ms-2">mdi-gate-open</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="8"></v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Decimal from "decimal.js";

export default {
  data() {
    return {
      game: {
        gameLoopIntervalID: this.$store.getters.gameLoopIntervalID,
        VIRTUES_NAMES: this.$store.getters.VIRTUES_NAMES,
        cost_multiplier: this.$store.getters.cost_multiplier,
        options: this.$store.getters.options,
      },

      humanity: new Decimal(10),
      wellbeing: new Decimal(0),
      soft_resets: new Decimal(0),
      collapses: new Decimal(0),
      wellbeing_cost: new Decimal(10000),
      virtues_bonus: new Decimal(0),

      virtues: [
        {
          name: "Survival",
          color: "virtue1",
          quantity: 0,
          momentum: 1,
          multiplier: new Decimal(1),
          h_per_sec: 0,
          cost: new Decimal(10),
          softreset_cost: 0,
        },
        {
          name: "Military",
          color: "virtue2",
          quantity: 0,
          momentum: 1,
          multiplier: new Decimal(1),
          h_per_sec: 0,
          cost: new Decimal(100),
          softreset_cost: 0,
        },
        {
          name: "Knowledge",
          color: "virtue3",
          quantity: 0,
          momentum: 1,
          multiplier: new Decimal(1),
          h_per_sec: 0,
          cost: new Decimal(100000),
          softreset_cost: 0,
        },
        {
          name: "Culture",
          color: "virtue4",
          quantity: 0,
          momentum: 1,
          multiplier: new Decimal(1),
          h_per_sec: 0,
          cost: new Decimal(1),
          softreset_cost: 1,
        },
        {
          name: "Cooperation",
          color: "virtue5",
          quantity: 0,
          momentum: 1,
          multiplier: new Decimal(1),
          h_per_sec: 0,
          cost: new Decimal(1),
          softreset_cost: 2,
        },
        {
          name: "Faith",
          color: "virtue6",
          quantity: 0,
          momentum: 1,
          multiplier: new Decimal(1),
          h_per_sec: 0,
          cost: new Decimal(1),
          softreset_cost: 3,
        },
        {
          name: "Ethics",
          color: "virtue7",
          quantity: 0,
          momentum: 1,
          multiplier: new Decimal(1),
          h_per_sec: 0,
          cost: new Decimal(1),
          softreset_cost: 4,
        },
      ],
    };
  },

  methods: {
    startInterval() {
      this.game.gameLoopIntervalID = setInterval(
        this.cycle,
        this.game.options.updateRate
      );
    },

    cycle() {
      for (var i = 1; i < 8; i++) {
        this.humanity = this.humanity.add(this.getVirtueProductionPerSec(i));
      }
    },

    getVirtueProductionPerSec(tier) {
      var name = this.game.VIRTUES_NAMES[tier];
      var quan = new Decimal(
        this.virtues.find((virtue) => virtue.name === name).quantity
      );

      var multiplier = this.getVirtueTotalMultiplier(name);
      // updates humanity per sec from virtue
      this.virtues[
        this.virtues.findIndex(
          (elem) => elem.name === this.game.VIRTUES_NAMES[tier]
        )
      ].h_per_sec = quan.mul(multiplier);
      // calculates h per TICK
      var updateFor = quan
        .mul(this.game.options.updateRate)
        .div(1000)
        .mul(multiplier);
      return updateFor;
    },

    getVirtueTotalMultiplier(name) {
      return this.virtues.find((virtue) => virtue.name === name).multiplier;
    },

    buyVirtue(name) {
      // spends humanity
      var virtue = this.virtues.find((virtue) => virtue.name === name);
      this.humanity = this.humanity.sub(virtue.cost);
      // buys 1 virtue
      virtue.quantity++;

      var index = this.virtues.findIndex((virtue) => virtue.name === name);
      if (name != "Survival") {
        // if virtue is not Survival, adds multiplier bonus to prev virtue
        this.virtues[index - 1].multiplier = this.virtues[index - 1].multiplier.add(0.1);
      }

      // verifies if 10 virtues been bought and updates virtue cost
      if (virtue.quantity % 10 === 0) {
        virtue.cost = virtue.cost.mul(this.game.cost_multiplier[index]);
      }
    },
  },




  computed: {
    humanity_with_decimals() {
      return (
        this.virtues.find((virtue) => virtue.name === "Survival").quantity < 10
      );
    },
    total_humanity_persec() {
      var total = new Decimal(0);
      for (var i = 0; i < 7; i++) {
        total = total.add(this.virtues[i].h_per_sec);
      }
      return total;
    },
    collapse1() {
      return this.collapses >= 1;
    },
  },




  mounted() {
    this.startInterval();
  },
};
</script>