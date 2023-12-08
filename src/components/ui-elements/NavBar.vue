<script>
import PaymentForm from "../pages/PaymentForm.vue";
export default {
  data() {
    return {
      cart: [], // Inizializza una variabile per contenere il carrello
    };
  },
  components: { PaymentForm },
  props: {
    isHomePage: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.cart = this.getCartFromLocalStorage();

    window.addEventListener("storage", () => {
      this.cart = this.getCartFromLocalStorage();
    });
  },
  methods: {
    getCartFromLocalStorage() {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
    <div class="container-fluid p-3">
      <img class="cloche mx-1" src="/img/cloche-white.svg" alt="" />
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
          <li class="nav-item">
            <router-link
              class="nav-link active text-light mx-2"
              aria-current="page"
              :to="{ name: 'home' }"
              >Homepage</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Contattaci</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Lavora con noi</a>
          </li>
          <li class="nav-item" v-if="!isHomePage">
            <button
              class="btn position-relative"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#paymentFormOffcanvas"
            >
              <font-awesome-icon icon="fa-solid fa-cart-shopping" size="xl" />
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >{{ cart.length }}</span
              >

              <span class="visually-hidden"></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}

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

.fa-cart-shopping {
  color: white;

  &:hover {
    color: rgb(234, 94, 61);
  }
}
</style>
