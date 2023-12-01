<script>
import axios from "axios";

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
    };
  },

  computed: {
    cartTotal() {
      let i;
      let total = 0;

      for (i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price;
      }
      return total;
    },
    totalItem() {
      let sum = 0;
      let summ = 0;
      this.cart.forEach(function (item) {
        let sum = item.price;
        summ += sum * parseFloat(item.qty);
      });
      return summ;
    },
  },
  created() {
    this.viewCart();
  },
  methods: {
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
        this.saveCats();
      } else {
        this.cartadd.id = item.id;
        this.cartadd.restaurantId = item.restaurant_id;
        this.cartadd.name = item.name;
        this.cartadd.price = item.price;
        this.cartadd.image = item.image;
        this.cartadd.qty = 1;
        this.cart.push(this.cartadd);
        this.cartadd = {};
        this.saveCats();
      }
    },
    clearCart() {
      this.cart = [];
      this.saveCats();
      this.showModal = false;
    },
    saveCats() {
      let parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
      this.viewCart();
      window.dispatchEvent(new Event("cart-updated"));
    },
    remove(id) {
      let item = findById(this.cart, id);
      if (item !== undefined) {
        item.qty -= 1;
        if (item.qty <= 0) {
          let index = this.cart.indexOf(item);
          this.cart.splice(index, 1);
        }
        this.saveCats();
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
    </div>
    <!--* Container Testi Pagina Ristorante -->
    <div class="container text">
      <h1>{{ restaurantInfo.name }}</h1>
      <p>{{ restaurantInfo.description }}</p>
    </div>
    <!--* Layout delle card dei PIATTI -->
    <div class="container">
      <div class="row">
        <div
          class="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mt-4 mb-2"
          v-for="dish in dishes"
          :key="dish.id + cartKey"
        >
          <div class="dish-card">
            <img :src="dish.image" class="dish-image" alt="" />
            <h5 class="card-title">{{ dish.name }}</h5>
            <p class="card-text">{{ dish.price }}</p>
            <span
              class="btn btn-success d-flex align-items-center px-4 ms-add-btn"
              @click="added(dish)"
              >Aggiungi</span
            >
          </div>
        </div>
        <!--! Nuova card v2 -->
      </div>
    </div>
  </div>
  <!--* Modale -->
  <div
    class="modal fade"
    id="restaurantMismatchModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="restaurantMismatchModalLabel"
    aria-hidden="true"
    :class="{ show: showModal, 'd-block': showModal }"
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
            data-dismiss="modal"
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Annulla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//Container Immagine
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
}

//STYLE DELLE DISH CARD
.dish-card {
  width: 250px;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 0px gray;
  padding: 10px;
  transition: all 0.5s;
  user-select: none;
  background-color: white;
  .dish-image {
    width: 100%;
    border-radius: 20px;
  }

  button {
    width: 30%;
    margin: 10px 0px;
  }
}

.row {
  h1 {
    border-radius: 20px;
    background-color: rgb(234, 94, 61);
    color: white;
    width: 80%;
    margin: 0px auto;
  }
}
</style>
