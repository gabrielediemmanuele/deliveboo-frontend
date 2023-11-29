<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";

import RestaurantCard from "../restaurants/RestaurantCard.vue";

export default {
  data() {
    return {
      baseUrl: "http://localhost:8000/api/",
      types: [],
      restaurants: [],
      filteredRestaurants: [],
      selectedTypeIds: [],
    };
  },

  components: {
    RestaurantCard,
  },

  methods: {
    fetchRestaurants() {
      const activeTypes = this.types.filter((type) => type.active);

      // Verifica se ci sono tipi attivi
      if (activeTypes.length > 0) {
        const selectedTypeIds = activeTypes.map((type) => type.id);

        axios
          .get(this.baseUrl + "get-restaurants-by-types/", {
            headers: { "Content-Type": "multipart/form-data" },
            params: { type_ids: selectedTypeIds },
          })
          .then((response) => {
            // filtra ogni tipo solo se presente
            this.filteredRestaurants = response.data.filter((restaurant) =>
              selectedTypeIds.every((typeId) =>
                restaurant.types.some((type) => type.id === typeId)
              )
            );
          })
          .catch((error) => {
            console.error("Error fetching restaurants by types:", error);
          });
      } else {
        // Se nessun tipo è attivo, mostra tutti i ristoranti
        axios.get(this.baseUrl + "restaurants").then((response) => {
          this.filteredRestaurants = response.data;
        });
      }
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
  <div class="container-home">
    <div class="cont-slogan">Mangia e bevi, QUANDO VUOI!</div>
    <div class="cont-rider-img">
      <img src="../../assets/img/" alt="" />
    </div>
  </div>
  <div class="container">
    <h3>I nostri ristoratori</h3>
    <div class="container mt-5">
      <!--* Etichette Tipi // :class="type.active ? 'label-' + type.label : 'disabled'" -->
      <h3>Seleziona un tipo</h3>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-12">
          <span
            v-for="(type, index) in types"
            :key="type.id"
            :class="type.active ? 'label-' + type.label : 'disabled'"
            @click="toggleType(type)"
            class="type-label mx-3 my-2"
          >
            {{ type.label }}
          </span>
        </div>
      </div>

      <div class="row">
        <!--* Card Ristoranti -->
        <!--! inserire all'interno di card il commento riga 87 - 90 -->
        <RestaurantCard
          v-for="restaurant in filteredRestaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
          :restaurantId="restaurant.id"
          :detailView="false"
        >
        </RestaurantCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-home {
  width: 100%;
  height: 350px;
  border: 2px dashed red;
  display: flex;
  align-items: center;
  justify-content: center;

  .cont-slogan {
    width: 40%;
    margin: auto 10px;
    border: 2px dashed rgb(34, 0, 255);
  }
  .cont-rider-img {
    width: 40%;
    margin: auto 10px;
    border: 2px dashed rgb(0, 255, 8);
  }
}
.type-label {
  color: rgb(255, 255, 255);
  background-color: rgb(192, 74, 0);
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.disabled {
  background-color: gray;
}
</style>
