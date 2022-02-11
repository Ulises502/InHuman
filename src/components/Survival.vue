<template>
  <div>
    <v-card-subtitle class="pb-0 font-weight-medium text-center text-subtitle-1"
      >-- Survival --</v-card-subtitle
    >
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto mt-n6"
              height="150"
              @click="buyUpgrade(1)"
            >
              <v-card-text
                class="font-weight-medium mt-12 text-center text-subtitle-1"
              >
                Fire <v-icon>mdi-campfire</v-icon>
                <p class="text-body-2 mt-2">Cost: 200 H</p>
                <p class="text-caption">x2 Humanity from Survival</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="6">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto mt-n6"
              height="150"
              @click="buyUpgrade(2)"
            >
              <v-card-text
                class="font-weight-medium mt-12 text-center text-subtitle-1"
              >
                Hunters <v-icon>mdi-bow-arrow</v-icon>
                <p class="text-body-2 mt-2">Cost: 1000 H</p>
                <p class="text-caption">Gain Humanity every 30 sec</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="6">
          <v-hover v-slot="{ hover }" disabled>
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto mt-n12"
              height="150"
              @click="buyUpgrade(3)"
            >
              <v-card-text
                class="font-weight-medium mt-12 text-center text-subtitle-1"
              >
                Tools <v-icon>mdi-spear</v-icon>
                <p class="text-body-2 mt-2">Cost: 2000 H</p>
                <p class="text-caption">Gain Survival every 30 sec</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="6">
          <v-hover v-slot="{ hover }" disabled>
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto mt-n12"
              height="150"
              @click="buyUpgrade(4)"
            >
              <v-card-text
                class="font-weight-medium mt-12 text-center text-subtitle-1"
              >
                Open Delay (Mouse enter)
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  methods: {
    buyUpgrade(id) {
      this.$store.dispatch('buyUpgrade', {id: id, type: 'Survival'});
    },
  },
};
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>