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
      cartadd: {
        id: "",
        name: "",
        price: "",
        image: "",
      },
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
        if (summ < 1) {
          $(".modal").hide();
        }
      });
      return summ;
    },
  },
  created() {
    this.viewCart();
  },
  methods: {
    viewCart() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
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
      let itemm = findById(this.cart, item.id);
      if (itemm !== undefined) {
        itemm.qty += 1;
        this.saveCats();
      } else {
        this.cartadd.id = item.id;
        this.cartadd.name = item.name;
        this.cartadd.price = item.price;
        this.cartadd.image = item.image;
        this.cartadd.qty = 1;
        this.cart.push(this.cartadd);
        this.cartadd = {};
        this.saveCats();
      }
    },
    saveCats() {
      let parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
      this.viewCart();
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
  },
  mounted() {
    this.fetchDishes();
  },
};
</script>

<template>
  <!-- <RestaurantLayout /> -->
  <div class="row">
    <div class="card" v-for="dish in dishes" :key="dish.id">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">{{ dish.price }}</p>
      <button type="button" class="btn btn-success" @click="added(dish)">
        +
      </button>

      <button class="btn btn-warning" type="button" @click="remove(dish.id)">
        -
      </button>
      <h3 class="mt-2" v-text="getQty(dish.id)"></h3>
      <!-- Altre informazioni sui piatti... -->
    </div>
    <div v-if="!totalItem == 0">
      <h3>Cart Total: ${{ totalItem }}</h3>
    </div>
    <h1 class="bg-primary text-center mt-5" v-else>Il tuo carrello è vuoto</h1>
  </div>
</template>

<style lang="scss" scoped></style>
