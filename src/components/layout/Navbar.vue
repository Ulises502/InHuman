<template>
  <div>
    <v-app-bar dense app>
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
  computed: {
    ...mapState({
      virtues: (state) => state.player.virtues,
    }),
  },
  mounted() {
    this.usuario =
      localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
  },
};
</script>