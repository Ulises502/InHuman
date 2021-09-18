<template>
  <div>
    <v-system-bar app
      dark
    >
      <v-spacer></v-spacer>
      <v-icon>mdi-message-alert</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
    <v-app-bar dark dense app>
      <v-toolbar-title class="text-body-2 text-sm-body-1 d-none d-sm-block">InHuman</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        small
        elevation="4"
        class="ma-2"
        :outlined="reset_1_outlined"
        color="primary"
        rounded
      >
        Soft Reset
      </v-btn>

      <v-btn
        small
        class="ma-2"
        :outlined="reset_2_outlined"
        color="primary"
        elevation="4"
      >
        Collapse
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" permanent app expand-on-hover>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-human</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Humanity</v-list-item-title>
          </v-list-item>

          <v-list-item to="/achievements">
            <v-list-item-icon>
              <v-icon>mdi-trophy</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Achievements</v-list-item-title>
          </v-list-item>

          <v-list-item to="/settings">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reset_1_outlined: false,
      reset_2_outlined: false,

      drawer: false,
      group: null,
    };
  },
};
</script>