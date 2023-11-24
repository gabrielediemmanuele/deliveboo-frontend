<script>
import RestaurantLayout from "../restaurants/RestaurantLayout.vue";

export default {
  data() {
    return {
      title: "Hello world",
    };
  },

  components: {
    RestaurantLayout,
  },
};
</script>

<template>
  <RestaurantLayout></RestaurantLayout>
</template>

<style lang="scss" scoped></style>
