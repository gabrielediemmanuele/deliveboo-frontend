<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";
import NavBar from "../ui-elements/NavBar.vue";

import RestaurantCard from "../restaurants/RestaurantCard.vue";

export default {
  data() {
    return {
      baseUrl: "http://localhost:8000/api/",
      types: [],
      restaurants: [],
      filteredRestaurants: [],
      selectedTypeIds: [],
      showNoRestaurantsMessage: false,
    };
  },

  components: {
    RestaurantCard,
    NavBar,
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
            // Se non ci sono ristoranti con queste categorie
            this.showNoRestaurantsMessage =
              this.filteredRestaurants.length === 0;
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
  <div class="total-container">
    <!--* Qui si trova lo scooter, il background e lo slogan -->
    <div class="container-home">
      <div class="row mx-auto justify-content-around align-items-center">
        <div class="col-lg-5 col-md-6 col-sm-6">
          <div class="cont-rider-img d-flex justify-content-center">
            <img
              class="rider-scooter d-flex justify-content-center"
              src="/img/Risorsa-5.png"
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

    <!--! Container FILTRI e RISTORANTI -->
    <div>
      <!-- Utilizzo del componente NavBar nella homepage, dove isHomePage è true -->
      <NavBar :isHomePage="true" />

      <!-- Resto del contenuto della tua homepage -->
    </div>

    <div class="container padding pb-4">
      <div class="our-resturants text-center mt-5 mb-2">
        <h1>I NOSTRI RISTORATORI</h1>
      </div>
      <!--* Container delle label per i filtri. Nota: le condizioni gestiscono le immagini differenti -->
      <div class="container textured mt-2">
        <div v-if="showNoRestaurantsMessage" class="no-restaurants-message">
          <p>
            {{
              showNoRestaurantsMessage
                ? "Ci dispiace! Non ci sono ristoranti con questa tipologia!"
                : ""
            }}
          </p>
        </div>

        <div class="row">
          <div
            class="col-lg-3 col-md-3 col-sm-6 col-xs-6 d-flex justify-content-around"
            v-for="(type, index) in types"
          >
            <div
              class="label-cont mt-4 mb-4 d-flex flex-column align-items-center"
              @click="toggleType(type)"
            >
              <!--* Immagini  // :class="{ active: !type.active }"-->
              <div class="filter-img-cont">
                <img
                  v-if="type.id === 1"
                  src="/img/antique-pizzeria.jpg"
                  alt=""
                />
                <img
                  v-else-if="type.id === 2"
                  src="/img/Croissant-dolci-francesi-e1619542389827.jpg"
                  alt=""
                />
                <img
                  v-else-if="type.id === 3"
                  src="/img/Traditional-British-food.jpg"
                  alt=""
                />
                <img
                  v-else
                  src="/img/brown-bird-perching-during-daytime-wren-wren-wallpaper-preview.jpg"
                  alt=""
                />
              </div>
              <!--* Labels -->
              <span
                :key="type.id"
                :class="type.active ? 'label-' + type.label : 'disabled'"
                class="type-label my-2"
              >
                {{ type.label }}
              </span>
            </div>
          </div>
        </div>

        <!--*  Qui trovi le card dei ristoranti, stampate tramite componente! -->
        <div class="row">
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
  </div>
</template>

<style lang="scss" scoped>
.total-container {
  background-image: url(img/pattern.png);
  background-position: center;
  background-repeat: repeat;
  background-size: 350px;
}

.container-home {
  width: 100%;
  padding: 40px 0px;

  .cont-slogan {
    color: rgb(48, 169, 129);

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
}

.label-cont {
  position: relative;
  cursor: pointer;

  .filter-img-cont {
    width: 120px;
    height: 120px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }

    &.active {
      filter: grayscale(100%);
    }
  }

  .type-label {
    position: absolute;
    top: 90px;
    color: rgb(255, 255, 255);
    background-color: rgb(48, 169, 129);
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }

  .disabled {
    background-color: gray;
  }
}

.container .textured {
  /*  background-image: url(../../../public/img/pattern.png);
  background-repeat: repeat; */
}

.no-restaurants-message {
  color: rgb(255, 255, 255);
  background-color: rgb(234, 94, 61);
  font-weight: bold;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  border-radius: 20px;
  padding: 5px;
  p {
    margin: 0px;
    padding: 0px;
  }
}
</style>
