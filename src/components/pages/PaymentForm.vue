<script>
export default {
  props: {
    cart: Array, // Assicurati che il componente riceva il carrello come prop
    totalItem: Number, // Assicurati che il componente riceva totalItem come prop
  },
  methods: {
    removeFromCart(id) {
      // Implementa la logica per rimuovere un elemento dal carrello
      this.$emit("remove", id); // Emetti un evento per notificare il componente padre
    },
    addToCart(item) {
      this.$emit("add", item);
    },
    clearCart(cart) {
      this.$emit("clearCart", cart);
    },
  },
};
</script>
<template>
  <!-- Contenuto del carrello -->
  <!--! SE IL CARRELLO HA QUALCOSA -->
  <div v-if="cart.length > 0">
    <div class="dish-card p-3" v-for="item in cart" :key="item.id">
      <!--* Dish Info  -->
      <div class="dish-info-cont d-flex">
        <img :src="item.image" alt="#" />
        <div class="cart-info">
          <h6 class="card-title">{{ item.name }}</h6>
          <div class="cad-cont d-flex">
            <div class="dish-price p-2">
              <strong>€</strong> {{ item.price }}
            </div>
            <div class="dish-quantity p-2">
              <strong>Quantità: </strong>
              <span>{{ item.qty }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--* Buttons -->
      <div class="buttons-cont d-flex justify-content-between mt-2">
        <button class="btn add" type="button" @click="addToCart(item)">
          Aggiungi
        </button>
        <button
          class="btn remove"
          type="button"
          @click="removeFromCart(item.id)"
        >
          Rimuovi
        </button>
      </div>
    </div>

    <!--* Totale + bottoni -->
    <h3 class="total">
      <em>Totale:</em><span> € {{ totalItem }}</span>
    </h3>

    <!--* CART BUTTONS  -->
    <div class="cart-buttons d-flex flex-column">
      <router-link
        class="btn checkout d-flex justify-content-center align-items-center"
        :to="{ name: 'checkout' }"
        aria-current="page"
        >Vai al checkout
        <font-awesome-icon icon="fa-solid fa-coins" size="lg" />
      </router-link>
      <div class="text-center"><em>oppure</em></div>
      <button
        class="btn trash d-flex justify-content-center align-items-center"
        type="button"
        @click="clearCart(cart)"
      >
        Svuota carrello
        <font-awesome-icon icon="fa-solid fa-cart-arrow-down" size="lg" />
      </button>
      <img class="text-center w-25 mx-auto" src="/img/Risorsa-3.png" alt="" />
    </div>
  </div>

  <!--! SE IL CARRELLO E' QUALCOSA -->
  <div class="d-flex flex-column align-items-center" v-else>
    <img class="text-center w-25 mx-auto" src="/img/Risorsa-4.png" alt="" />
    <h1 class="empty-cart text-center mt-3">Il tuo carrello è vuoto</h1>
    <router-link
      class="btn btn-homepage mx-2 d-flex justify-content-center align-items-center"
      aria-current="page"
      :to="{ name: 'home' }"
      >Torna alla Home <font-awesome-icon icon="fa-solid fa-house" size="lg"
    /></router-link>
    <em class="my-2">e/o clicca fuori da questa schermata!</em>
  </div>
</template>

<style lang="scss" scoped>
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
            margin-right: 4px;
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
      background-color: rgb(48, 169, 129);
      color: white;
      &:active {
        background-color: white;
        color: rgb(48, 169, 129);
        border: 1px solid rgb(48, 169, 129);
      }
    }
    .btn.remove {
      background-color: rgb(234, 94, 61);
      color: white;

      &:active {
        background-color: rgb(234, 94, 61);
        color: white;

        background-color: white;
        color: rgb(234, 94, 61);
        border: 1px solid rgb(234, 94, 61);
      }
    }
  }
}

// Total
.total {
  color: black;
  span {
    color: rgb(234, 94, 61);
  }
}

//Bottoni carrello
.cart-buttons {
  .btn {
    width: 100% !important;
    margin: 15px 0px;
  }
  .btn.checkout {
    background-color: rgb(48, 169, 129);
    color: white;
    font-weight: bold;
    &:hover {
      background-color: rgb(19, 65, 50) !important;
    }
  }
  .btn.trash {
    background-color: rgb(234, 105, 105);
    color: white;
    font-weight: bold;
    &:hover {
      background-color: rgb(184, 77, 77);
    }
  }
  .fa-coins {
    margin-left: 10px;
  }
  .fa-cart-arrow-down {
    margin-left: 10px;
  }
}

//Carrello vuoto
.empty-cart {
  border-radius: 20px;
  background-color: rgb(234, 94, 61);
  color: white;
  padding: 20px;
}
.btn-homepage {
  width: 100%;
  background-color: rgb(48, 169, 129);
  color: white;
  font-weight: bold;
  &:hover {
    background-color: rgb(19, 65, 50);
    cursor: pointer;
  }

  .fa-house {
    margin-left: 10px;
  }
}
</style>
