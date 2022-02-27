<template>
  <v-card-text class="mt-3">
    <v-select
      v-model="items[0]"
      :items="items"
      filled
      disabled
      prepend-icon="mdi-crown"
      class="mb-n10"
    ></v-select>
    <div id="chart">
      <apexchart
        type="radar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </v-card-text>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  data() {
    return {
      items: ["Egalitarianism", "Theocracy", "Tyranny", "Monarchy"],
      series: [
        {
          name: "Series 1",
          data: [50, 50, 80, 0, 20, 20],
        },
      ],
      chartOptions: {
        chart: {
          type: "radar",
          toolbar: {
            show: false,
            tools: {
              download: false,
            },
          },
        },
        xaxis: {
          categories: [
            "Population",
            "Infrastructure",
            "Labor",
            "Social Hierarchy",
            "Conncections",
            "Territory",
          ],
        },
        fill: {
          opacity: 0.6,
        },
        plotOptions: {
          radar: {
            polygons: {
              strokeColor: "#707070",
            },
          },
        },
        yaxis: {
          show: false,
          min: 0,
          max: 100,
          tickAmount: 5,
        },
      },
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
};
</script>