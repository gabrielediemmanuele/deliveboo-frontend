<script>
import axios from "axios";
import PaymentForm from "./PaymentForm.vue";
import NavBar from "../ui-elements/NavBar.vue";

function findById(arr, id) {
  return arr.find((x) => x.id === id);
}
export default {
  data() {
    return {
      baseUrl: "http://localhost:8000/api/",
      dishes: [],
      cart: [],
      restaurantInfo: [],
      cartKey: 0,
      cartadd: {
        id: "",
        restaurantId: "",
        name: "",
        price: "",
        image: "",
      },
      showModal: false,
      showModalemptyCart: false,
    };
  },
  components: { PaymentForm, NavBar },
  computed: {
    cartTotal() {
      let i;
      let total = 0;

      for (i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price;
      }
      return total.toFixed(2);
    },
    totalItem() {
      let sum = 0;
      this.cart.forEach(function (item) {
        let itemTotal = item.price * item.qty;
        sum += itemTotal;
      });
      return Number(sum.toFixed(2));
    },
  },
  created() {
    this.viewCart();
  },
  methods: {
    removeFromCart(id) {
      // Implementa la logica per rimuovere un elemento dal carrello
      let item = findById(this.cart, id);
      if (item !== undefined) {
        item.qty -= 1;
        if (item.qty <= 0) {
          let index = this.cart.indexOf(item);
          this.cart.splice(index, 1);
        }
        this.saveCart();
      }
    },
    fetchRestaurant() {
      axios
        .get(this.baseUrl + `restaurants/${this.$route.params.restaurantId}`)
        .then((response) => {
          this.restaurantInfo = response.data;
        });
    },
    fetchDishes() {
      // qui si farà la chiamata axios per il singolo ristorante.
      //dentro RestaurantLayout ci sarà la prop di ristorante.
      //e ci sarà anche tutta la struttura del layout!
      axios
        .get(
          this.baseUrl + `restaurants/${this.$route.params.restaurantId}/dishes`
        )
        .then((response) => {
          this.dishes = response.data;
        })

        .catch((error) => {
          console.error("Error fetching dishes:", error);
        });
    },
    viewCart() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
        // Questo serve per mostrare il badge con il numero di prodotti nel carrello
        this.badge = this.cart.length;
        this.totalprice = this.cart.reduce((total, item) => {
          return total + item.qty * item.price;
        }, 0);
      }
    },
    getQty(id) {
      let item = findById(this.cart, id);
      if (item !== undefined) return item.qty;
      else return 0;
    },
    added(item) {
      // Verifica se il carrello è vuoto
      if (this.cart.length === 0) {
        this.addToCart(item);
      } else {
        // Verifica se il piatto appartiene allo stesso ristorante degli altri piatti nel carrello
        const isSameRestaurant = this.cart.every(
          (cartItem) => cartItem.restaurantId === item.restaurant_id
        );

        if (isSameRestaurant) {
          this.addToCart(item);
        } else {
          // Mostra la modale
          this.showModal = true;
        }
      }
    },

    addToCart(item) {
      let itemm = findById(this.cart, item.id);
      if (itemm !== undefined) {
        itemm.qty += 1;
        this.saveCart();
      } else {
        this.cartadd.id = item.id;
        this.cartadd.restaurantId = item.restaurant_id;
        this.cartadd.name = item.name;
        this.cartadd.price = item.price;
        this.cartadd.image = item.image;
        this.cartadd.qty = 1;
        this.cart.push(this.cartadd);
        this.cartadd = {};
        this.saveCart();
      }
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
      this.showModal = false;
      this.showModalemptyCart = false;
      // this.$emit("cart-cleared");
    },

    saveCart() {
      let parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
      this.viewCart();
      window.dispatchEvent(new Event("storage"));
    },
    remove(id) {
      let item = findById(this.cart, id);
      if (item !== undefined) {
        item.qty -= 1;
        if (item.qty <= 0) {
          let index = this.cart.indexOf(item);
          this.cart.splice(index, 1);
        }
        this.saveCart();
      }
    },
  },
  mounted() {
    this.fetchDishes();
    this.fetchRestaurant();
  },
};
</script>

<template>
  <NavBar></NavBar>
  <!--* Restaurant Page Layout - Container Totale -->
  <div class="total-container">
    <!--* Container per l'immagine del ristorante -->
    <div
      class="images-container d-flex justify-content-center align-items-end"
      :style="{ backgroundImage: 'url(' + restaurantInfo.image + ')' }"
    >
      <img
        v-if="restaurantInfo.id === 1"
        src="/img/chefremy.jpg"
        alt=""
        class="profile-image"
      />
      <img
        v-else-if="restaurantInfo.id === 2"
        src="/img/krustylogo.png"
        alt=""
        class="profile-image"
      />
      <img
        v-else-if="restaurantInfo.id === 3"
        src="/img/Upizzaiuole.png"
        alt=""
        class="profile-image"
      />
      <img
        v-else-if="restaurantInfo.id === 4"
        src="/img/paiolomagico.jpg"
        alt=""
        class="profile-image"
      />
      <img
        v-else
        src="/img/Restaurant-Logo-Design-2-1536x864.jpg"
        alt=""
        class="profile-image"
      />
    </div>
    <!--* Container Testi Pagina Ristorante -->
    <div class="container text">
      <h1>{{ restaurantInfo.name }}</h1>
      <p class="mb-5">{{ restaurantInfo.description }}</p>
      <h2 class="my-3">I nostri piatti</h2>
    </div>
    <!--* Layout delle card dei PIATTI -->
    <div class="container dishes">
      <div class="row justify-content-evenly">
        <div
          class="dish-card d-flex flex-column justify-content-between mt-3"
          v-for="dish in dishes"
          :key="dish.id"
        >
          <img :src="dish.image" class="dish-image mb-1" alt="" />
          <h6 class="card-title">{{ dish.name }}</h6>
          <p class="card-price">€{{ dish.price }}</p>
          <div class="description-cont scroll-1 my-1">
            <p class="card-text">{{ dish.description }}</p>
          </div>
          <div
            class="btn-container d-flex justify-content-between align-items-center"
          >
            <button type="button" class="btn-add" @click="added(dish)">
              Aggiungi
            </button>
            <h3 class="" v-text="getQty(dish.id)"></h3>
            <button class="btn-remove" type="button" @click="remove(dish.id)">
              Rimuovi
            </button>
          </div>
          <!-- Altre informazioni sui piatti... -->
        </div>
      </div>
    </div>
  </div>
  <!-- OFFCANVAS -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="paymentFormOffcanvas"
    aria-labelledby="paymentFormOffcanvasLabel"
  >
    <div class="offcanvas-header">
      <h2 class="offcanvas-title mx-auto" id="paymentFormOffcanvasLabel">
        Il tuo Carrello
      </h2>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <!-- Includi il componente PaymentForm -->
      <PaymentForm
        :cart="cart"
        :totalItem="totalItem"
        @remove="removeFromCart"
        @add="addToCart"
        @clearCart="clearCart, (this.showModalemptyCart = true)"
      ></PaymentForm>
    </div>
  </div>
  <!--* Modale -->
  <div
    class="modal fade"
    id="restaurantMismatchModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="restaurantMismatchModalLabel"
    :class="{ show: showModal, 'd-block': showModal }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="restaurantMismatchModalLabel">
            Attenzione!
          </h3>
          <button
            type="button"
            class="close"
            @click="showModal = false"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Non puoi aggiungere piatti di altri ristoranti al carrello.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="clearCart">
            Svuota Carrello
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="showModal = false"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- *OFFCANVAS -->
  <div
    class="modal fade"
    id="restaurantMismatchModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="restaurantMismatchModalLabel"
    :class="{ show: showModalemptyCart, 'd-block': showModalemptyCart }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="restaurantMismatchModalLabel">
            Attenzione!
          </h5>
          <button
            type="button"
            class="close"
            @click="showModalemptyCart = false"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">Sei sicuro di voler svuotare il carrello?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="clearCart">
            Si sono sicuro
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="showModalemptyCart = false"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.total-container {
  background-image: url(../../../public/img/pattern.png);
  background-position: center;
  background-repeat: repeat;
  background-size: 450px;
}
//Container Immagine
.container.dishes {
  /* margin-bottom: 30px; */
  padding-bottom: 30px;
}
.images-container {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 80px;

  position: relative;
  .profile-image {
    width: 200px;
    height: 200px;
    border: 5px solid rgb(255, 255, 255);
    position: absolute;
    bottom: -70px;
    border-radius: 50%;
  }
}
// OFFCANVAS
.offcanvas {
  box-shadow: -7px 0px 30px 0px rgba(0, 0, 0, 0.45);
  background-color: rgb(48, 169, 129);
  border: none !important;
}
.offcanvas-title {
  color: rgb(255, 255, 255);
}

//Container Testi
.container.text {
  text-align: center !important;

  h1 {
    font-family: fantasy;
    color: rgb(234, 94, 61);
  }
  p {
    font-style: italic;
  }
  h2 {
    color: rgb(48, 169, 129);
  }
}

//STYLE DELLE DISH CARD
.dish-card {
  width: 200px;
  border-radius: 20px;
  background-color: white !important;
  box-shadow: 0px 0px 4px 0px gray;
  padding: 10px;
  transition: all 0.5s;
  user-select: none;
  &:hover {
    transform: scale(1.05);
  }
  .dish-image {
    width: 100%;
    height: 160px;
    border-radius: 20px;
  }

  h6 {
    color: rgb(234, 94, 61);
    font-weight: bold;
  }

  .card-price {
    margin: 0 !important;
    font-weight: bold;
  }
  .description-cont {
    height: 50px;
    border-radius: 5px;
    /* box-shadow: 0px 0px 1px 0px rgb(135, 135, 135) inset; */
    padding: 3px;
    font-size: 12px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scroll-1::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scroll-1::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: rgb(48, 169, 129);
  }
}

//Button Container
.btn-container {
  margin-top: 20px;
  .btn-add {
    border-radius: 20px !important;
    padding: 4px 8px !important;
    font-size: 12px;
    position: relative;
    background-color: #04aa6d;
    border: none;
    color: #ffffff;
    font-weight: bold;
    user-select: none;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      border-radius: 4em;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.5s;
      box-shadow: 0 0 5px 10px rgb(19, 65, 50);
    }

    &:active:after {
      box-shadow: 0 0 0 0 rgb(19, 65, 50);
      position: absolute;
      border-radius: 4em;
      left: 0;
      top: 0;
      opacity: 1;
      transition: 0s;
    }

    &:active {
      top: 1px;
    }
  }
  .btn-remove {
    border-radius: 20px;
    box-shadow: 0px 0px 1px 0px rgb(135, 135, 135);
    padding: 4px 8px;
    background-color: rgb(234, 94, 61);
    color: white;
    font-size: 12px;
    font-weight: bold;
    border-style: none;
  }
}

//MODAL STYLE
.modal-content {
  box-shadow: 0px 0px 12px 1px rgb(80, 80, 80);
  .modal-header {
    .modal-title {
      color: #04aa6d;
    }

    .close {
      border: none;
      background-color: white;
      font-size: 30px;
      color: rgb(234, 94, 61);
    }
  }
}
</style>
