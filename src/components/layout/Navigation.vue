<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    app
    :permanent="!$vuetify.breakpoint.mobile"
    bottom
  >
    <v-list-item class="px-2" v-if="!$vuetify.breakpoint.mobile">
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item link @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-list-item-icon>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Theme</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      miniOption: true,
    };
  },
  computed: {
    drawer: {
      // getter
      get: function () {
        return this.$store.state.game.drawer;
      },

      // setter
      set: function (newValue) {
        this.$store.commit("game/setDrawer", newValue);
      },
    },
    mini: {
      // getter
      get: function () {
        return !this.$vuetify.breakpoint.mobile && this.miniOption;
      },

      // setter
      set: function (newValue) {
        this.miniOption = newValue;
      },
      
    },
  },
};
</script>