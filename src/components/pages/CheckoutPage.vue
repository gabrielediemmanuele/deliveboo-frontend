<script>
import NavBar from "../ui-elements/NavBar.vue";
import axios from "axios";
import braintree from "braintree-web";

export default {
  data() {
    return {
      title: "Pagina Pagamento",
      cart: [],
      totalItem: 0,

      // logica braintree
      braintreeClient: null,
      braintreeHostedFields: null,
      myUrl: "http://localhost:8000",
      error: {},
      payLoad: false,

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
      errors: {
        guest_name: "",
        guest_surname: "",
        guest_address: "",
        guest_phone: "",
        guest_mail: "",
      },
    };
  },
  created() {
    this.cart = JSON.parse(this.$route.query.cart);
    this.totalItem = this.$route.query.totalItem;
    this.initializeBraintree();
  },

  components: {
    NavBar,
  },

  methods: {
    // Controllo validazione input
    submitForm() {
      if (!this.formData.guest_name) {
        this.errors.guest_name = "Inserisci il nome.";
        return;
      } else {
        this.errors.guest_name = "";
      }

      if (!this.formData.guest_surname) {
        this.errors.guest_surname = "Inserisci il cognome.";
        return;
      } else {
        this.errors.guest_surname = "";
      }
      if (!this.formData.guest_address) {
        this.errors.guest_address = "Inserisci l'indirizzo.";
        return;
      } else {
        this.errors.guest_address = "";
      }
      if (!this.formData.guest_phone) {
        this.errors.guest_phone = "Inserisci un numero di telefono.";
        return;
      } else {
        this.errors.guest_phone = ""; // Cancella eventuali errori precedenti
      }

      if (isNaN(this.formData.guest_phone)) {
        this.errors.guest_phone = "Inserisci un numero di telefono valido.";
        return;
      } else {
        this.errors.guest_phone = ""; // Cancella eventuali errori precedenti
      }
      if (!this.formData.guest_mail) {
        this.errors.guest_mail = "Inserisci un indirizzo mail valido.";
        return;
      } else {
        this.errors.guest_mail = "";
      }

      this.payWithCard();
      // Aggiungi l'array cart al formData
      this.formData.cart = this.cart;
      // chiamata axios che manda i dati al back-end (Orders)
      axios
        .post("http://localhost:8000/api/orders", this.formData)
        .then((response) => {
          console.log("Dati inviati con successo:", response.data);
        });
    },
    // pulizia carrello
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
      // window.dispatchEvent(new Event("cart-updated"));
    },

    // RICHIESTA GET PER IL TOKEN BRAINTREE
    async initializeBraintree() {
      try {
        const resp = await axios.get("http://localhost:8000/api/generate");
        const token = resp.data.token;

        const client = await braintree.client.create({
          authorization: token,
        });

        // Resto del codice per la gestione del cliente Braintree
        const hostedFieldsInstance = await braintree.hostedFields.create({
          client,
          styles: {
            input: {
              "font-size": "14px",
              "font-family": "Open Sans",
            },
          },
          fields: {
            number: {
              selector: "#creditCardNumber",
              placeholder: "Inserisci numero carta",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "Inserisci CVV",
            },
            expirationDate: {
              selector: "#expireDate",
              placeholder: "MM / AAAA",
            },
          },
        });

        this.braintreeHostedFields = hostedFieldsInstance;
      } catch (error) {
        console.error("Error fetching or using the token:", error);
      }
    },

    // RICHIESTA AXIOS POST PER INVIARE I DATI AL BACK END
    payWithCard() {
      if (this.braintreeHostedFields) {
        this.payLoad = true;
        this.error = "";

        this.braintreeHostedFields.tokenize().then((payload) => {
          axios
            .post("http://localhost:8000/api/payment", {
              amount: Number(this.totalItem),
              token: payload.nonce,
            })
            .then((resp) => {
              this.payLoad = false;
              this.clearCart();
              this.$router.push("/thankyou");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    },
  },
};
</script>

<template>
  <NavBar :isHomePage="true" />
  <div class="total-cont">
    <div class="container form">
      <h1>{{ title }}</h1>
      <div class="mb-3">
        <em
          >I campi contrassegnati con "<span class="text-danger">*</span>" sono
          obbligatori.</em
        >
      </div>
      <form @submit.prevent="submitForm">
        <!--* contenuto del form (dati utente) -->
        <div class="row">
          <div class="col-lg-6 my-2">
            <label for="name" class="form-label"
              >Nome<span class="text-danger">*</span></label
            >
            <input
              v-model="formData.guest_name"
              type="text"
              name="name"
              id="name"
              class="form-control"
              :class="{ 'is-invalid': errors.guest_name }"
              placeholder="Es. Federica / Fabio"
            />
            <div class="invalid-feedback">{{ errors.guest_name }}</div>
          </div>
          <div class="col-lg-6 my-2">
            <label for="surname" class="form-label"
              >Cognome<span class="text-danger">*</span></label
            >
            <input
              v-model="formData.guest_surname"
              type="text"
              name="surname"
              id="surname"
              class="form-control"
              :class="{ 'is-invalid': errors.guest_surname }"
              placeholder="Es. Rossi"
            />
            <div class="invalid-feedback">{{ errors.guest_surname }}</div>
          </div>
          <div class="col-lg-4 my-2">
            <label for="address" class="form-label"
              >Indirizzo<span class="text-danger">*</span></label
            >
            <input
              v-model="formData.guest_address"
              type="text"
              name="address"
              id="address"
              class="form-control"
              :class="{ 'is-invalid': errors.guest_address }"
              placeholder="Es. Via Cerasi 4"
            />
            <div class="invalid-feedback">{{ errors.guest_address }}</div>
          </div>
          <div class="col-lg-4 my-2">
            <label for="phone" class="form-label"
              >Numero<span class="text-danger">*</span></label
            >
            <input
              v-model="formData.guest_phone"
              type="text"
              name="phone"
              id="phone"
              class="form-control"
              :class="{ 'is-invalid': errors.guest_phone }"
              placeholder="Es. 3287485948"
            />
            <div class="invalid-feedback">{{ errors.guest_phone }}</div>
          </div>

          <div class="col-lg-4 my-2">
            <label for="email" class="form-label"
              >Email<span class="text-danger">*</span></label
            >
            <input
              v-model="formData.guest_mail"
              type="email"
              name="email"
              id="email"
              class="form-control"
              :class="{ 'is-invalid': errors.guest_mail }"
              placeholder="Es. FedericaRossi@live.it"
            />
            <div class="invalid-feedback">{{ errors.guest_mail }}</div>
          </div>
        </div>

        <!--* Template Carta nuovo  -->
        <div>
          <div class="form-group">
            <label class="text mt-3">
              Numero di carta di credito <span class="need text-danger">*</span>
            </label>
            <!--* Brand Icons -->
            <span class="brands-cont">
              <img
                src="../../../public/img/mastercard.png"
                alt="mastercard logo"
              />
              <img src="../../../public/img/paypal.png" alt="paypal logo" />
              <img src="../../../public/img/visa.svg.png" alt="visa logo" />
            </span>
            <div id="creditCardNumber" class="form-control mt-2">
              <span
                style="color: red"
                class="error-message"
                v-if="error.guestName"
                >Es. 4111 1111 1111 1111</span
              >
            </div>
          </div>

          <div class="form-group">
            <div class="d-flex justify-content-between">
              <div class="col-lg-6">
                <label class="text">
                  Data di scadenza
                  <span class="need text-danger">*</span></label
                >
                <div id="expireDate" class="form-control">
                  <span
                    style="color: red"
                    class="error-message"
                    v-if="error.guestName"
                    >Inserire data di scadenza</span
                  >
                </div>
              </div>
              <div class="col-lg-6">
                <label class="text">
                  CVV <span class="need text-danger">*</span></label
                >
                <div id="cvv" class="form-control">
                  <span
                    style="color: red"
                    class="error-message"
                    v-if="error.guestName"
                    >Inserire CVV</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="last-cont mt-2">
          <div class="total">
            <span
              ><strong class="me-2">Totale:</strong>€ {{ this.totalItem }}</span
            >
          </div>
          <div class="my-3">
            <div v-if="this.totalItem <= 0" class="bg-danger mb-3">
              <span class="ps-3">Carrello vuoto, effettua un ordine.</span>
              <span class="fas fa-arrow-right"></span>
            </div>
            <button type="submit" v-else class="btn btn-checkout mb-3">
              <span class="">Ordina Adesso</span>
              <div v-show="payLoad" class="cell"></div>
            </button>
          </div>
        </div>
        <!-- <h3>Totale da pagare: € {{ this.totalItem }}</h3>

        <button type="submit" class="btn btn-primary mt-4">Invia dati</button> -->
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.total-cont {
  background-image: url(../../../public/img/pattern.png);
  background-position: center;
  background-repeat: repeat;
  background-size: 550px;
  padding-top: 55px;
  padding-bottom: 55px;
  .container.form {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}
#creditCardNumber {
  height: 50px;
  margin-bottom: 10px;
}
/* color: rgb(48, 169, 129); */
::placeholder {
  color: rgb(196, 196, 196);
}
.container {
  width: 60%;
  border: 2px solid rgb(48, 169, 129);
  padding: 35px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: white;
  h1 {
    color: rgb(234, 94, 61);
  }
}

.brands-cont {
  img {
    width: 20px;
    margin: 0px 10px;
  }
}

#expireDate {
  height: 50px;
  width: 90%;
}
#cvv {
  height: 50px;
  width: 90%;
}

.btn-checkout {
  background-color: rgb(48, 169, 129);
  color: rgb(255, 255, 255);
  font-weight: bold;
  &:hover {
    background-color: rgb(234, 94, 61) !important;
    color: white;
  }
}
</style>
