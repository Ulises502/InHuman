<template>
  <div class="text-center">
    <v-card-subtitle
      class="pb-0 mb-2 font-weight-medium text-center text-subtitle-1"
    >
      -- Faith --
    </v-card-subtitle>
    <v-card-text>
      <v-avatar size="150">
        <img src="https://picsum.photos/510/300?random" alt="Altar" />
      </v-avatar>
      <p class="mt-2">Gain multiplier to Faith<v-icon color="accent" class="mt-n1 ms-2">mdi-bird</v-icon> <span class="font-weight-regular text-center text-subtitle-2">x55</span></p>
      <v-select
        background-color="accent"
        :items="items"
        label="Sacrifice"
        hint="Offer a sacrifice"
        persistent-hint
        solo
      ></v-select>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      items: ["Humanity", "Survival", "Might"],
    };
  },
};
</script>