<script>
import RestaurantLayout from "../restaurants/RestaurantLayout.vue";

export default {
  data() {
    return {
      title: "Hello world",
    };
  },
  // qui si farà la chiamata axios per il singolo ristorante.
  //dentro RestaurantLayout ci sarà la prop di ristorante.
  //e ci sarà anche tutta la struttura del layout!
  components: {
    RestaurantLayout,
  },
};
</script>

<template>
  <RestaurantLayout></RestaurantLayout>
</template>

<style lang="scss" scoped></style>
