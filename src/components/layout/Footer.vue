<template>
  <v-footer dark padless app>
    <v-progress-linear
      v-show="virtues.Ethics.bought.gte(1)"
      color="teal"
      buffer-value="0"
      value="20"
      stream
    ></v-progress-linear>
    <v-btn
      fab
      color="secondary"
      top
      right
      absolute
      v-show="virtues.Ethics.bought.gte(1)"
    >
      <v-icon>mdi-script-text-outline</v-icon>
    </v-btn>
    <v-col class="text-center" cols="12">
      2022 — <strong>InHuman</strong>
    </v-col>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      virtues: (state) => state.player.virtues,
    }),
  },
};
</script>