<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      /* title: "Hello world", */
    };
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
    <div class="container-fluid p-3">
      <img class="cloche mx-1" src="../../assets/img/cloche-white.svg" alt="" />
      <router-link class="navbar-brand text-light" :to="{ name: 'home' }"
        >DeliveBoo</router-link
      >
      <button
        class="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link active text-light mx-2"
              aria-current="page"
              :to="{ name: 'home' }"
              >Homepage</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active text-light mx-2" aria-current="page"
              >Contattaci</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active text-light mx-2" aria-current="page"
              >Lavora con Noi</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.cloche {
  width: 40px;
}

.container-fluid {
  background-color: rgb(48, 169, 129);
  font-weight: bold;
}

.nav-link {
  font-size: 20px;
}
.navbar-brand {
  font-size: 30px !important;
}
.nav-link:hover {
  color: rgb(19, 65, 50) !important;
  cursor: pointer;
}

.navbar-brand:hover {
  color: rgb(19, 65, 50) !important;
}
</style>
