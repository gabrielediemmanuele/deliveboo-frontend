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
    /* fetchRestaurants() {
      const activeTypes = [];

      this.types.forEach((type) => {
        if (type.active) {
          activeTypes.push(type.id);
        }
      });

      axios
        .get(this.baseUrl + "get-restaurants-by-types/", {
          headers: { "Content-Type": "multipart/from-data" },
          params: { type_id: activeTypes },
        })
        .then((response) => {
          this.filteredRestaurants = response.data;
        });
    }, */

    /* fetchRestaurants() {
      const activeTypes = this.types.filter((type) => type.active);

      // Verifica se ci sono tipi attivi
      if (activeTypes.length > 0) {
        const selectedType = activeTypes[0];

        axios
          .get(this.baseUrl + "get-restaurants-by-types/", {
            headers: { "Content-Type": "multipart/form-data" },
            params: { type_id: selectedType.id },
          })
          .then((response) => {
            // Filtra solo i ristoranti con il tipo selezionato
            this.filteredRestaurants = response.data.filter((restaurant) =>
              restaurant.types.some((type) => type.id === selectedType.id)
            );
          });
      } else {
        // Se nessun tipo è attivo, mostra tutti i ristoranti
        this.filteredRestaurants = this.restaurants;
      }
    }, */

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
            // Filtra solo i ristoranti che hanno almeno uno dei tipi selezionati
            this.filteredRestaurants = response.data.filter((restaurant) =>
              restaurant.types.some((type) => selectedTypeIds.includes(type.id))
            );
          });
      } else {
        // Se nessun tipo è attivo, mostra tutti i ristoranti
        this.filteredRestaurants = this.restaurants;
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
  <div class="container-home-image">
    <div class="container-text">
      <h3>Welcome to DeliveBoo</h3>
    </div>
  </div>
  <div class="container">
    <h3>I nostri ristoratori</h3>
    <div class="container mt-5">
      <!--* Etichette Tipi -->
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
          :detailView="false"
        >
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
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.label-Italiano {
  background-color: rgb(85, 136, 85);
}

.label-Francese {
  background-color: rgb(101, 101, 169);
}

.label-Americano {
  background-color: rgb(231, 193, 123);
}
.label-Inglese {
  background-color: rgb(225, 125, 125);
}
.disabled {
  background-color: gray;
}
</style>
