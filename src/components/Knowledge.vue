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
                class="mx-auto align-center justify-center"
                height="148"
                width="148"
              >
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="15"
                  :value="35"
                  :color="$vuetify.theme.dark ? '#fff' : '#000'"
                  class="align-center justify-center"
                >
                  286
                </v-progress-circular></v-sheet
              >
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

    <v-card-text>
      <v-select
        v-model="e1"
        :items="states"
        menu-props="auto"
        label="Select"
        hide-details
        prepend-icon="mdi-eye-outline"
        single-line
      ></v-select>
      <v-select
        v-model="e2"
        :items="states"
        menu-props="auto"
        label="Select"
        hide-details
        prepend-icon="mdi-lightbulb-on-outline"
        single-line
      ></v-select>
      <v-select
        v-model="e3"
        :items="states"
        menu-props="auto"
        label="Select"
        hide-details
        prepend-icon="mdi-test-tube"
        single-line
      ></v-select>
      <v-select
        v-model="e4"
        :items="states"
        menu-props="auto"
        label="Select"
        hide-details
        prepend-icon="mdi-flare"
        single-line
      ></v-select>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data() {
    return {
      states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
    };
  },
};
</script>