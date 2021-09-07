<template>
  <v-container>
    <div class="text-center text-h6 text-md-h4">
      Humanity {{ humanity == undefined ? "0" : humanity }}
    </div>
    <div class="text-body-2 text-md-body-1">
      Wellbeing {{ wellbeing == undefined ? "0" : wellbeing }}
    </div>
  </v-container>
</template>

<script>
export default {
  humanity: 0,
  wellbeing: 0,
};
</script>