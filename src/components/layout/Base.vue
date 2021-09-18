<template>
  <v-app>
    <Navbar />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <v-snackbar
        :timeout="timeout"
        :value="notify_save"
        absolute
        right
        top
        shaped
        outlined
        color="success"
      >
        Game Saved.
      </v-snackbar>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "Base",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return { timeout: 3000 };
  },
  computed: {
    notify_save() {
      return this.$store.getters.notifySave;
    },
  },
  watch: {
    notify_save() {
      if (this.notify_save) {
        setTimeout(async () => {this.$store.commit('SET_NOTIFYSAVE', false)}, 4000);
      }
    }
  }
};
</script>