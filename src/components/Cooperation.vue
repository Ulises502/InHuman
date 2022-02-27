<template>
  <v-card-text>
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
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20],
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
        plotOptions: {
          radar: {
            polygons: {
              strokeColor: "#e8e8e8",
              fill: {
                colors: ["#f8f8f8", "#fff"],
              },
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