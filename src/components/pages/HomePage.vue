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
    <div class="row mx-auto justify-content-around align-items-center">
      <div class="col-lg-5 col-md-6 col-sm-6">
        <div class="cont-rider-img d-flex justify-content-center">
          <img
            class="rider-scooter d-flex justify-content-center"
            src="../../assets/img/Risorsa-5.png"
            alt=""
          />
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="cont-slogan text-center p-3">
          <h1>con <strong>DeliveBoo</strong>, mangia e bevi</h1>
          <h1 class="orange">QUANDO VUOI!</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="our-resturants text-center mt-5">
      <h1>I NOSTRI RISTORATORI</h1>
    </div>
    <div class="container mt-5">
      <!--* Etichette Tipi // :class="type.active ? 'label-' + type.label : 'disabled'" -->
      <div class="row justify-content-around align-items-center">
        <div class="col-lg-3 col-md-4 col-sm-12">
          <span
            v-for="(type, index) in types"
            :key="type.id"
            :class="type.active ? 'label-' + type.label : 'disabled'"
            @click="toggleType(type)"
            class="type-label my-2"
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
  padding: 40px 0px;
  background-image: url(../../assets/img/pattern.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  .cont-slogan {
    color: rgb(48, 169, 129);
    h1 {
      text-shadow: 1px 1px 2px rgb(0, 0, 0);
    }
    .orange {
      color: rgb(234, 94, 61);
      font-weight: bold;
    }
  }
  .cont-rider-img {
    .rider-scooter {
      width: 70%;
    }
  }
}

.our-resturants {
  color: rgb(48, 169, 129);
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
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
