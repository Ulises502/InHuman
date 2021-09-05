<template>
  <v-footer dark padless fixed app>
    <v-col cols="12" class="py-0">
      <v-slider
        v-model="value"
        class="pt-3"
        readonly
        value="100"
        :thumb-size="45"
        thumb-label="always"
        thumb-color="blue"
        color="orange darken-3"
        ><template v-slot:thumb-label> History </template></v-slider
      >
    </v-col>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      value: 100,
    };
  },
};
</script>