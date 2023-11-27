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
  <div class="col-lg-4 col-md-6 col-sm-12 mt-4 mb-2">
    <div class="card" style="width: 18rem">
      <!--* da modificare!  -->
      <img :src="restaurant.image" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ restaurant.name }}</h5>
        <p class="card-text">{{ restaurant.description }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ restaurant.address }}</li>
        <li class="list-group-item">{{ restaurant.phone_number }}</li>
        <li
          class="list-group-item type-label d-flex justify-content-center"
          v-for="(type, index) in restaurant.types"
          :key="type.id"
          :class="'label-' + type.label"
        >
          {{ type.label }}
        </li>
      </ul>
      <div class="card-body">
        <router-link
          :to="{ name: 'restaurant', params: { restaurantId: restaurant.id } }"
          class="btn btn-primary mt-1 my-2 mx-5"
          >Visita il ristorante</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-label {
  color: rgb(255, 255, 255);
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  width: 40%;
  text-align: center;
  margin: 5px auto;
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
