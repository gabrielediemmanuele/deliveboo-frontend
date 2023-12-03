<script>
export default {
  data() {
    return {
      cart: [],
      cartKey: 0,
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
    },
  },
  methods: {
    getQty(id) {
      let item = this.cart.find((item) => item.id === id);
      if (item !== undefined) return item.qty;
      else return 0;
    },
    added(item) {
      let itemInCart = this.cart.find((cartItem) => cartItem.id === item.id);

      if (itemInCart !== undefined) {
        itemInCart.qty += 1;
      } else {
        item.qty = 1;
        this.cart.push({ ...item, qty: 1 });
      }
      this.saveCart();
      this.cartKey += 1;
      // Aggiungi un console.log per visualizzare un messaggio o i dati
      console.log("Item added:", item); // Ad esempio, qui mostrerà l'oggetto item aggiunto

      // Oppure stampa il carrello per verificare se è stato aggiornato correttamente
      console.log("Updated cart:", this.cart);
    },

    remove(id) {
      let index = this.cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        let item = this.cart[index];
        item.qty -= 1;
        if (item.qty <= 0) {
          this.cart.splice(index, 1);
        }
        this.saveCart();
        this.cartKey += 1;
      }
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCart() {
      const cart = localStorage.getItem("cart");
      if (cart) {
        this.cart = JSON.parse(cart);
      }
    },
  },
  created() {
    this.loadCart();

    // Aggiorna il carrello quando viene rilevato un cambiamento nello storage locale
    window.addEventListener("cart-updated", () => {
      this.loadCart();
    });
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
    <div class="container-fluid p-3">
      <img class="cloche mx-1" src="/img/cloche-white.svg" alt="" />
      <router-link class="navbar-brand text-light" :to="{ name: 'home' }">DeliveBoo</router-link>
      <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
          <li class="nav-item">
            <router-link class="nav-link active text-light mx-2" aria-current="page"
              :to="{ name: 'home' }">Homepage</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Contattaci</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Lavora con noi</a>
          </li>
          <li class="nav-item">
            <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight">
              <font-awesome-icon icon="fa-solid fa-cart-shopping" size="xl" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- OFFCANVAS -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-body">
      <div v-if="cart.length > 0">
        <div v-for="item in  cart " :key="item.id + cartKey" class="card">
          <h5 class="card-title">Nome piatto: {{ item.name }}</h5>
          <p class="card-text">Prezzo: {{ item.price }} €</p>
          <button type="button" class="btn btn-success" @click="added(item)">
            +
          </button>
          <button class="btn btn-warning" type="button" @click="remove(item.id)">
            -
          </button>
          <h3 class="mt-2" v-text="getQty(item.id)"></h3>
        </div>
        <h3>Totale: €{{ cartTotal }}</h3>
      </div>
      <div v-else>
        <h1 class="bg-primary text-center mt-5">Il tuo carrello è vuoto</h1>
      </div>
    </div>
  </div>
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
  margin-left: 20px;
  color: white;

  &:hover {
    color: rgb(234, 94, 61);
  }
}
</style>
