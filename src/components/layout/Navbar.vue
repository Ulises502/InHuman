<template>
  <div>
    <v-app-bar color="white accent-4" dense app>
      <v-toolbar-title>App Vue</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-badge
        :value="hover"
        color="orange accent-4"
        left
        bottom
        offset-y="0.5rem"
        transition="slide-x-transition"
      >
        <template v-slot:badge>
          {{ usuario }}
        </template>
        <v-hover v-model="hover">
          <v-btn icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-hover>
      </v-badge>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="option in options"
            :key="option"
            @click="() => {}"
          >
            <v-list-item-title> {{ option }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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