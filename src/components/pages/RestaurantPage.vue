<script>
import axios from "axios";

export default {
  data() {
    return {
      baseUrl: "http://localhost:8000/api/",
      dishes: [],
    };
  },
  // qui si farà la chiamata axios per il singolo ristorante.
  //dentro RestaurantLayout ci sarà la prop di ristorante.
  //e ci sarà anche tutta la struttura del layout!
  // components: {
  //   RestaurantLayout,
  // },
  props: {restaurantId: Number},

  methods: {
    fetchDishes() {
      axios
        .get(this.baseUrl + `restaurants/${this.$route.params.restaurantId}/dishes`)
        .then((response) => {
          this.dishes = response.data;
        })
        
        .catch((error) => {
          console.error("Error fetching dishes:", error);
        });

    },
  },
  mounted() {
    this.fetchDishes();
  },
};
</script>

<template>
  <!-- <RestaurantLayout /> -->
  <div class="row">
    <div class="card" v-for="dish in dishes" :key="dish.id">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">{{ dish.description }}</p>
      <!-- Altre informazioni sui piatti... -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
