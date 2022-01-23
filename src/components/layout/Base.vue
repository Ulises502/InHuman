<template>
  <v-app>
    <Navigation />
    <Navbar />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navigation from "@/components/layout/Navigation.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "Base",
  components: {
    Navigation,
    Navbar,
    Footer,
  },

  mounted() {
    // calls the action startInterval inside game module (which is namespaced)
    this.$store.dispatch("game/startInterval");
  },
};
</script>