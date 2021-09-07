<template>
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
        <v-btn elevation="3" small class="ms-3">
          <div style="font-size: 10px">
            <p class="ma-0 pa-0">Cost:</p>
            <p class="ma-0 pa-0">{{ wellbeing_cost }} H</p>
          </div>
        </v-btn>
      </v-col>

      <v-col cols="4" class="text-center">
        <p class="text-caption text-md-body-2 ma-0">You are making</p>
        <p class="text-caption text-md-body-2 ma-0">
          {{ humanity_gain }} Humanity /s
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
                  text-center
                "
              >
                Momentum: {{ row.momentum }}
              </p>
              <p
                class="
                  d-flex d-sm-none
                  text-caption text-md-body-2
                  ma-0
                  text-center
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
              <v-btn elevation="5" small block class="mx-2">
                <div style="font-size: 10px">
                  <p class="ma-0 pa-0">Cost:</p>
                  <p class="ma-0 pa-0">{{ wellbeing_cost }} H</p>
                </div>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- BONUS CHIP -->
    <v-row class="my-2 d-flex justify-center">
      <v-chip class="ma-2" color="success" small outlined>
        BONUS: + {{ virtues_bonus }} %
      </v-chip>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      humanity: 0,
      wellbeing: 0,
      wellbeing_cost: 1234567,
      humanity_gain: 12345,
      virtues_bonus: 256,

      virtues: [
        {
          name: "Survival",
          quantity: 150,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234453,
        },
        {
          name: "Military",
          quantity: 150,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234453,
        },
        {
          name: "Knowledge",
          quantity: 150,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234453,
        },
        {
          name: "Culture",
          quantity: 150,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234453,
        },
        {
          name: "Cooperation",
          quantity: 150,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234453,
        },
        {
          name: "Faith",
          quantity: 150,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234453,
        },
        {
          name: "Ethics",
          quantity: 150,
          momentum: 1,
          bonus: 256,
          h_per_sec: 1234455,
          cost: 1234453,
        },
      ],
    };
  },
};
</script>