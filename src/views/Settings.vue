<template>
  <v-row>
    <v-col class="d-flex justify-center">
      <v-switch v-model="themeDark" inset label="Theme Dark"></v-switch>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      themeDark: this.$store.getters.updateRate,
    };
  },
  watch: {
    themeDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>