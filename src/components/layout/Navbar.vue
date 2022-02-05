<template>
  <div>
    <v-app-bar dense app>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mobile" @click.stop="changeDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>InHuman</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-show="virtues.Ethics.bought.gte(1)" depressed :disabled="virtues.Ethics.bought.gte(10)" > Collapse </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      options: ["Actualizar", "Opciones", "Ayuda", "Logout"],
      usuario: "caca",
      hover: false,
    };
  },
  methods: {
    changeDrawer() {
      this.$store.dispatch("game/changeDrawer");
    },
  },
  computed: {
    ...mapState({
      virtues: (state) => state.player.virtues,
      drawer: (state) => state.game.drawer,
    }),
  },
  mounted() {
    this.usuario =
      localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
  },
};
</script>