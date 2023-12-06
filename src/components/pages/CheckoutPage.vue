<script>
import NavBar from "../ui-elements/NavBar.vue";
import axios from "axios";

export default {
  data() {
    return {
      title: "Pagina Pagamento",
      cart: [],
      totalItem: 0,

      //   oggetto che si riempie all'inserimento dei dati
      formData: {
        guest_name: "",
        guest_surname: "",
        guest_address: "",
        guest_phone: "",
        guest_mail: "",
        totalItem: this.$route.query.totalItem,
        cart: this.cart,
      },
    };
  },
  created() {
    this.cart = JSON.parse(this.$route.query.cart);
    this.totalItem = this.$route.query.totalItem;
  },

  components: {
    NavBar,
  },

  methods: {
    submitForm() {
      // Aggiungi l'array cart al formData
      this.formData.cart = this.cart;
      // chiamata axios che manda i dati al back-end (Orders)
      axios
        .post("http://localhost:8000/api/orders", this.formData)
        .then((response) => {
          console.log("Dati inviati con successo:", response.data);
        });



      // chiamata axios che manda i dati al back-end (Braintree)

      // axios
      //   .post("http://localhost:8000/api/payment", this.formData)
      //   .then((response) => {
      //     console.log("Dati inviati con successo:", response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Errore durante la richiesta:", error.response.data);
      //   });
    },
  },
};
</script>

<template>
  <NavBar :isHomePage="true" />
  <div class="container">
    <h1>{{ title }}</h1>

    <form @submit.prevent="submitForm">
      <label for="name" class="form-label">Nome</label>
      <input
        v-model="formData.guest_name"
        type="text"
        name="name"
        id="name"
        class="form-control"
      />

      <label for="surname" class="form-label">Cognome</label>
      <input
        v-model="formData.guest_surname"
        type="text"
        name="surname"
        id="surname"
        class="form-control"
      />

      <label for="address" class="form-label">Indirizzo</label>
      <input
        v-model="formData.guest_address"
        type="text"
        name="address"
        id="address"
        class="form-control"
      />

      <label for="phone" class="form-label">Numero</label>
      <input
        v-model="formData.guest_phone"
        type="text"
        name="phone"
        id="phone"
        class="form-control"
      />

      <label for="email" class="form-label">Email</label>
      <input
        v-model="formData.guest_mail"
        type="email"
        name="email"
        id="email"
        class="form-control"
      />

      <h3>Totale da pagare: € {{ this.totalItem }}</h3>

      <button type="submit" class="btn btn-primary mt-4">Invia dati</button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
