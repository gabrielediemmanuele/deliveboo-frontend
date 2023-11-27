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

  props: ["restaurantId"],

  methods: {
    fetchDishes() {
      axios
        .get(this.baseUrl + "dishes", {
          params: {
            restaurant_id: this.restaurantId,
          },
        })
        .then((response) => {
          this.dishes = response.data;
        });
    },
  },
  mounted() {
    this.fetchDishes();
  },
};
</script>

<template>
  <div class="container">
    <div class="container-image">
      <img src="" alt="" />
    </div>
    <h1>nome ristorante</h1>
    <div>
      <p>descrizione</p>
    </div>
    <div class="row">
      <div class="card">qui si vedranno tutti i piatti.</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
