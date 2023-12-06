<script>
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
        total: 0,
      },
    };
  },
  created() {
    this.cart = JSON.parse(this.$route.query.cart);
    this.totalItem = this.$route.query.totalItem;
  },

  methods: {
    submitForm() {
      // chiamata axios che manda i dati al back-end
      axios
        .post("http://localhost:8000/api/orders", this.formData)
        .then((response) => {
          console.log("Dati inviati con successo:", response.data);
        });

      axios
        .post("http://localhost:8000/api/api/payment", this.formData)
        .then((response) => {
          console.log("Dati inviati con successo:", response.data);
        });
    },
  },
};
</script>

<template>
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
