<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";

export default {
  data() {
    return {
      baseUrl: "http://localhost:8000/api/",
      dishes: [],
    };
  },

  props: {restaurantId: Number},

  methods: {
    fetchDishes() {
      axios
        .get(this.baseUrl + `restaurants/${this.restaurantId}/dishes`)
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
  <div class="row">
    <div class="card" v-for="dish in dishes" :key="dish.id">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">{{ dish.description }}</p>
      <!-- Altre informazioni sui piatti... -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
