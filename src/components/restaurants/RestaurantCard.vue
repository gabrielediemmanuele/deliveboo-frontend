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
    detailView: Boolean,
  },
  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div class="col mt-5 mb-5">
    <div class="card" style="width: 18rem">
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Nome Ristorante</h5>
        <p class="card-text">Descrizione</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Indrizzo</li>
        <li class="list-group-item">Numero</li>
        <li class="list-group-item">Tipologia</li>
      </ul>
      <div class="card-body">
        <router-link
          :to="{ name: 'restaurant' }"
          class="btn btn-primary mt-1 my-2 mx-5"
          >Visita il ristorante</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
