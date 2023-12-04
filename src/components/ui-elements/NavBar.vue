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
      const total = this.cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );

      // Utilizza .toFixed(2) per arrotondare il totale a due cifre decimali
      return total.toFixed(2);
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
    clearCart() {
      this.cart = [];
      this.saveCart();
    },

    loadCart() {
      const cart = localStorage.getItem("cart");
      if (cart) {
        this.cart = JSON.parse(cart);
      } else {
        this.cart = []; // Assicura che se non c'è nessun carrello salvato, l'array cart sia vuoto
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
          <li class="nav-item">
            <button
              class="btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <font-awesome-icon icon="fa-solid fa-cart-shopping" size="xl" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- OFFCANVAS -->
  <div
    class="offcanvas offcanvas-end p-2 d-flex flex-column justify-content-center align-items-center"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <h1>Carrello</h1>
    <div class="offcanvas-body">
      <div v-if="cart.length > 0">
        <div
          v-for="item in cart"
          :key="item.id + cartKey"
          class="dish-card p-3"
        >
          <!--* Dish Info  -->
          <div class="dish-info-cont d-flex">
            <img :src="item.image" alt="#" />
            <div class="cart-info">
              <h6 class="card-title">{{ item.name }}</h6>
              <div class="cad-cont d-flex">
                <div class="dish-price p-1">
                  <strong>€</strong> {{ item.price }}
                </div>
                <div class="dish-quantity p-1">
                  <strong>Quantity: </strong>
                  <span>{{ getQty(item.id) }} </span> /pz
                </div>
              </div>
            </div>
          </div>

          <!--* Buttons -->
          <div class="buttons-cont d-flex justify-content-between mt-2">
            <button class="btn add" type="button" @click="added(item)">
              +
            </button>
            <button class="btn remove" type="button" @click="remove(item.id)">
              -
            </button>
          </div>
        </div>
        <!--* Totale + bottoni -->
        <h3>
          Totale: € <span>{{ cartTotal }}</span>
        </h3>
        <!--* CART BUTTONS  -->
        <div class="cart-buttons">
          <router-link
            @click="paymentSection"
            class="btn btn-warning d-flex justify-content-center align-items-center"
            :to="{ name: 'payment' }"
            aria-current="page"
            >Vai al checkout
          </router-link>
          <button
            class="btn btn-danger trash d-flex justify-content-center align-items-center"
            type="button"
            @click="clearCart()"
          >
            Svuota carrello
          </button>
        </div>
      </div>
      <div v-else>
        <h1 class="bg-primary text-center mt-5">Il tuo carrello è vuoto</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// NAVBAR
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

// Offcanvas e contenuti
.dish-card {
  width: 100%;
  box-shadow: 0px 0px 3px 0px grey;
  border-radius: 20px;
  margin: 15px 5px;
  .dish-info-cont {
    //CARD IMG
    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      margin-right: 15px;
    }
    //CARD INFO
    .cart-info {
      .card-title {
        color: rgb(48, 169, 129);
        font-size: 20px;
      }
      .cad-cont {
        margin-top: 10px;
        .dish-price {
          margin-right: 10px;
          box-shadow: 0px 0px 3px 0px grey;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          strong {
            color: rgb(234, 94, 61);
            margin-right: 2px;
          }
        }
        .dish-quantity {
          box-shadow: 0px 0px 3px 0px grey;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            color: rgb(234, 94, 61);
            font-weight: bold;
            font-size: 25px;
            margin-left: 3px;
          }
        }
      }
    }
  }
  //BUTTONS
  .buttons-cont {
    .btn {
      width: 45%;
      font-weight: bold;
      font-size: 20px;
      padding: 0px !important;
    }
    .btn.add {
      background-color: white;
      color: rgb(48, 169, 129);
      border: 1px solid rgb(48, 169, 129);
      &:hover {
        background-color: rgb(48, 169, 129);
        color: white;
      }
    }
    .btn.remove {
      background-color: white;
      color: rgb(234, 94, 61);
      border: 1px solid rgb(234, 94, 61);
      &:hover {
        background-color: rgb(234, 94, 61);
        color: white;
      }
    }
  }
}
</style>
