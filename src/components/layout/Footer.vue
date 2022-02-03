<template>
  <v-footer dark padless app>
    <v-progress-linear
      color="teal"
      buffer-value="0"
      value="20"
      stream
    ></v-progress-linear>
    <v-col class="text-center" cols="12">
      2022 — <strong>InHuman</strong>
    </v-col>
    <v-btn
      fab
      color="secondary"
      top
      right
      absolute
    >
      <v-icon>mdi-script-text-outline</v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
export default {};
</script>