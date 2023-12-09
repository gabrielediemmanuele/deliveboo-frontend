<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      title: "Hello world",
    };
  },

  props: {
    restaurant: Object,
    restaurantId: Number,
    detailView: Boolean,
  },
  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div
    class="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mt-4 mb-2"
  >
    <div
      class="restaurant-card d-flex flex-column justify-content-between mt-4"
    >
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
        class="restaurant-image"
        alt="..."
      />
      <div class="restaurant-info mt-2">
        <h6 class="card-title">{{ restaurant.name }}</h6>
        <p class="card-text">{{ restaurant.description }}</p>
      </div>
      <ul class="list-group list-group-flush mt-2">
        <li class="list-group-item">
          <strong>Indirizzo:</strong> {{ restaurant.address }}
        </li>
        <li class="list-group-item">
          <strong>Telefono:</strong> {{ restaurant.phone_number }}
          <hr />
        </li>
      </ul>
      <div class="d-flex flex-wrap justify-content-center">
        <li
          class="list-group-item type-label d-flex justify-content-center"
          v-for="(type, index) in restaurant.types"
          :key="type.id"
          :class="'label-' + type.label"
        >
          {{ type.label }}
        </li>
      </div>
      <router-link
        :to="{ name: 'restaurant', params: { restaurantId: restaurant.id } }"
        class="btn my-3 mx-3"
        >Visita il ristorante</router-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.restaurant-card {
  width: 230px;

  border-radius: 20px;
  box-shadow: 0px 0px 4px 0px gray;
  padding: 10px;
  transition: all 0.5s;
  user-select: none;
  background-color: white;

  &:hover {
    transform: scale(1.05);
  }
  .restaurant-image {
    border-radius: 20px;
    height: 140px;
  }

  .restaurant-info {
    h6 {
      color: rgb(234, 94, 61);
    }
    .card-text {
      font-size: 13px;
    }
  }
  .list-group {
    font-size: 13px;
    text-align: start;
    .list-group-item {
      margin: 5px 0px !important;
      padding: 0 !important;
      hr {
        margin: 2px;
      }
      strong {
        color: rgb(48, 169, 129);
      }
    }
  }

  .btn {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(234, 94, 61);
    color: rgb(234, 94, 61);

    &:hover {
      background-color: rgb(234, 94, 61);
      color: white;
    }
  }
}
.type-label {
  color: rgb(255, 255, 255);
  background-color: rgb(234, 94, 61);
  padding: 2px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  margin: 5px 5px;
}
</style>
