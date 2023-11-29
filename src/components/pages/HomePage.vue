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
  <div>
    <font-awesome-icon icon="fa-solid fa-cart-shopping" />
  </div>
  <div class="container-home-image">
    <div class="container-text">
      <h3>Welcome to DeliveBoo</h3>
    </div>
  </div>
  <div class="container">
    <h3>I nostri ristoratori</h3>
    <div class="container mt-5">
      <!--* Etichette Tipi // :class="type.active ? 'label-' + type.label : 'disabled'" -->
      <h3>Seleziona un tipo</h3>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-12">
          <span v-for="(type, index) in types" :key="type.id" :class="type.active ? 'label-' + type.label : 'disabled'"
            @click="toggleType(type)" class="type-label mx-3 my-2">
            {{ type.label }}
          </span>
        </div>
      </div>

      <div class="row">
        <!--* Card Ristoranti -->
        <!--! inserire all'interno di card il commento riga 87 - 90 -->
        <RestaurantCard v-for="restaurant in filteredRestaurants" :key="restaurant.id" :restaurant="restaurant"
          :restaurantId="restaurant.id" :detailView="false">
        </RestaurantCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-home-image {
  width: 100%;
  height: 350px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url("https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg");
  display: flex;
  align-items: center;
  justify-content: center;

  .container-text {
    width: 80%;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      color: white;
    }
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
