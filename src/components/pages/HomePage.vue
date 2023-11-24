<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";

import RestaurantCard from "../restaurants/RestaurantCard.vue";

export default {
  data() {
    return {
      baseUrl: "http://127.0.0.1:8000/api/",
      types: [],
      filteredRestaurants: [],
    };
  },

  components: {
    RestaurantCard,
  },

  methods: {
    fetchRestaurants() {
      const activeTypes = [];

      this.types.forEach((type) => {
        if (type.active) {
          activeTypes.push(type.id);
        }
      });

      axios
        .get(this.baseUrl + "get-restaurants-by-type", {
          headers: { "Content-Type": "multipart/from-data" },
          params: { activeTypes },
        })
        .then((response) => {
          this.filteredRestaurants = response.data.data;
        });
    },

    fetchTypes() {
      axios.get(this.baseUrl + "types").then((response) => {
        this.types = response.data.map((type) => {
          return {
            ...type,
            active: false,
          };
        });
      });
    },

    toggleType(type) {
      type.active = !type.active;
      this.fetchRestaurants();
    },
  },

  created() {
    this.fetchTypes();
    this.fetchRestaurants();
  },
};
</script>

<template>
  <div class="container">
    <h3>Filtra Ristoranti</h3>

    <div class="row">
      <h3>Seleziona un tipo</h3>
      <div class="col-4 d-flex flex-column text-center">
        <!--  <span
          v-for="(type, index) in types"
          :key="type.id"
          :class="type.active ? 'label-' + type.label : 'disabled'"
          @click="toggleType(type)"
          class="type-label mx-3 my-2"
        >
          {{ type.label }}
        </span> -->
        <span class="badge bg-primary w-25 mb-3">Francese</span>
        <span class="badge bg-danger w-25 mb-3">Americano</span>
        <span class="badge bg-success w-25">Italiano</span>
      </div>
      <div>
        <!--! inserire all'interno di card il commento riga 87 - 90 -->
        <RestaurantCard> </RestaurantCard>
        <!-- v-for="restaurant in filteredRestaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
          :detailView="false" -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-label {
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
}

.label-Front-End {
  background-color: rgb(50, 124, 86);
}

.label-Back-End {
  background-color: rgb(212, 119, 66);
}

.label-Full-stack {
  background-color: rgb(76, 55, 101);
}

.disabled {
  background-color: gray;
}
</style>
