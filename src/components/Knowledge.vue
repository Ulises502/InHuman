<template>
  <div>
    <v-card-subtitle class="font-weight-medium text-center text-subtitle-1"
      >-- Knowledge --</v-card-subtitle
    >
    <v-img
      class="d-flex align-center text-center"
      height="350px"
      src="https://picsum.photos/510/300?random"
      :gradient="
        $vuetify.theme.dark
          ? 'to bottom, rgba(30,30,30,0.6), rgba(30,30,30,0.6)'
          : 'to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.5)'
      "
    >
      <v-row class="justify-center mb-n5">
        <v-btn style="z-index: 100" elevation="8" fab>
          <v-icon> mdi-eye-outline </v-icon>
        </v-btn>
      </v-row>
      <v-row class="align-center justify-center">
        <v-btn style="z-index: 100" elevation="8" fab class="mt-n5 ms-8 me-n8">
          <v-icon> mdi-flare </v-icon>
        </v-btn>
        <v-avatar size="250" class="mt-n5">
          <v-img src="https://picsum.photos/510/300?random" alt="Altar">
            <v-row class="align-center justify-center">
              <v-sheet
            rounded="circle"
            class="mx-auto"
            height="100"
            width="100"
          >
          <v-progress-circular
                :rotate="-90"
                :size="100"
                :width="15"
                :value="35"
                :color="$vuetify.theme.dark ? '#fff' : '#000'"
                class="align-center justify-center"
              >
                286
              </v-progress-circular></v-sheet>
              
            </v-row>
          </v-img>
        </v-avatar>
        <v-btn elevation="8" fab class="mt-n5 me-8 ms-n8">
          <v-icon> mdi-lightbulb-on-outline </v-icon>
        </v-btn>
      </v-row>
      <v-row class="justify-center mt-n8">
        <v-btn elevation="8" fab>
          <v-icon> mdi-test-tube </v-icon>
        </v-btn>
      </v-row>
    </v-img>
  </div>
</template>

<script>
export default {};
</script>