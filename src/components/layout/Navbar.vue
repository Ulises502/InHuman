<template>
  <div>
    <v-app-bar dense app>
      <v-toolbar-title>InHuman</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn depressed disabled > Collapse </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ["Actualizar", "Opciones", "Ayuda", "Logout"],
      usuario: "caca",
      hover: false,
    };
  },
  mounted() {
    this.usuario =
      localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
  },
};
</script>