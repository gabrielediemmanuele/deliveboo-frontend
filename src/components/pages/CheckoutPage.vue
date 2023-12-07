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

      FormData: {
        guest_name: "",
        guest_surname: "",
        guest_address: "",
        guest_phone: "",
        guest_mail: "",
        totalItem: this.$route.query.totalItem,
        cart: this.cart,
      }
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
    submitForm() {
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
      this.showModal = false;
      this.showModalemptyCart = false;
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
              alert("Payment successful!");
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.payLoad = false;
              this.clearCart();
              this.$router.push("/thankyou");
            });
        });
      }
    },


    // RICHIESTA AXIOS POST PER INVIARE I DATI AL BACK END
    payWithCard() {
      if (
        this.guestName === '' ||
        this.guestLastname === '' ||
        this.guestAddress === '' ||
        this.guestPhone === '' ||
        this.guestMail === ''
      ) {
        this.error = {
          guestName: this.guestName === '' ? 'Inserisci il nome' : '',
          guestLastname: this.guestLastname === '' ? 'Inserisci il cognome' : '',
          guestAddress: this.guestAddress === '' ? 'Inserisci l\'indirizzo' : '',
          guestPhone: this.guestPhone === '' ? 'Inserisci il telefono' : '',
          guestMail: this.guestMail === '' ? 'Inserisci l\'email' : '',
        };
        return;
      }
      if (this.braintreeHostedFields) {
        this.payLoad = true;
        this.error = "";

        console.log('Valore di totalItem:', this.totalItem);
        this.braintreeHostedFields.tokenize().then(payload => {
          console.log(payload.nonce);
          axios.post(`${this.myUrl}/api/payment`, {
            "totalItem": Number(this.totalItem),
            "token": 'payload.nonce',
            "guest_name": this.guestName,
            "guest_lastname": this.guestLastname,
            "guest_phone": this.guestPhone,
            "guest_address": this.guestAddress,
            "guest_mail": this.guestMail,
          }).then(resp => {
            console.log(resp);
            alert("Payment successful!");
            console.log(payWithCard)
          }).catch(err => {
            console.log(err);
          }).finally(() => {
            this.payLoad = false;
            this.clearCart();
            this.$router.push('/thankyou');
          });
        })
      }
    }
  }
}
</script>

<template>
  <!--New Form-->
  <div class="card px-4">
    <p class="h8 py-3">Dettagli Pagamento</p>
    <form class="text-center ">
      <div class="row gx-3">
        <div class="col-12">
          <div class="d-flex  my-3 flex-column">
            <label for="guest_name" class="text mb-1">Nome <span class="need">*</span></label>
            <input class="form-control mb-3" v-model="guestName" type="text" name="guest_name" id="guest_name" required
              minlength="3" maxlength="20">
            <span style="color: red;" class="error-message" v-if="error.guestName">{{ error.guestName
            }}</span>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex  my-3 flex-column">
            <label for="guest_lastname" class="text mb-1">Cognome <span class="need">*</span></label>
            <input class="form-control mb-3" v-model="guestLastname" type="text" name="guest_lastname" id="guest_lastname"
              required minlength="3" maxlength="20">
            <span style="color: red;" class="error-message" v-if="error.guestLastname">{{
              error.guestLastname }}</span>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex  my-3 flex-column">
            <label for="guest_address" class="text mb-1">Indirizzo <span class="need">*</span></label>
            <input class="form-control mb-3" v-model="guestAddress" type="text" name="guest_address" id="guest_address"
              required minlength="3" maxlength="20">
            <span style="color: red;" class="error-message" v-if="error.guestAddress">{{ error.guestAddress
            }}</span>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex  my-3 flex-column">
            <label for="guest_mail" class="text mb-1">E-Mail <span class="need">*</span></label>
            <input class="form-control mb-3" type="email" v-model="guestMail" name="guest_mail" id="guest_mail" required
              minlength="3" maxlength="30">
            <span style="color: red;" class="error-message" v-if="error.guestMail">{{ error.guestMail
            }}</span>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex my-3  flex-column">
            <label class="text mb-1" for="guest_phone">Telefono : <span class="need">*</span></label>
            <input v-model="guestPhone" class="form-control no-number-spinners" type="text" name="guest_phone"
              id="guest_phone" required minlength="3" maxlength="20">
            <span style="color: red;" class="error-message" v-if="error.guestPhone">{{ error.guestPhone
            }}</span>
          </div>
        </div>
        <h2 class="h8 my-3">Dati Bancari</h2>
        <div>
          <div class="form-group">
            <label class="text"> Numero di carta di credito <span class="need">*</span> </label>
            <div id="creditCardNumber" class="form-control"> </div>
            <span style="color: red;" class="error-message" v-if="error.guestName">Inserire numeri
              carta</span>

          </div>
          <div class="form-group">
            <div class="riga d-flex">
              <div class="col-6">
                <label class="text"> Data di scadenza <span class="need">*</span></label>
                <div id="expireDate" class="form-control"> </div>
                <span style="color: red;" class="error-message" v-if="error.guestName">Inserire data di
                  scadenza</span>

              </div>
              <div class="col-6">
                <label class="text"> CVV <span class="need">*</span></label>
                <div id="cvv" class="form-control"> </div>
                <span style="color: red;" class="error-message" v-if="error.guestName">Inserire
                  CVV</span>

                <label for="address" class="form-label">Indirizzo</label>
                <input v-model="formData.guest_address" type="text" name="address" id="address" class="form-control" />

                <label for="phone" class="form-label">Numero</label>
                <input v-model="formData.guest_phone" type="text" name="phone" id="phone" class="form-control" />

                <label for="email" class="form-label">Email</label>
                <input v-model="formData.guest_mail" type="email" name="email" id="email" class="form-control" />

                <!-- Template Carta nuovo  -->
                <div>
                  <div class="form-group">
                    <label class="text">
                      Numero di carta di credito <span class="need">*</span>
                    </label>
                    <div id="creditCardNumber" class="form-control"></div>
                    <span style="color: red" class="error-message" v-if="error.guestName">Inserire numeri carta</span>
                  </div>
                  <div class="form-group">
                    <div class="riga d-flex">
                      <div class="col-6">
                        <label class="text">
                          Data di scadenza <span class="need">*</span></label>
                        <div id="expireDate" class="form-control"></div>
                        <span style="color: red" class="error-message" v-if="error.guestName">Inserire data di
                          scadenza</span>
                      </div>
                      <div class="col-6">
                        <label class="text"> CVV <span class="need">*</span></label>
                        <div id="cvv" class="form-control"></div>
                        <span style="color: red" class="error-message" v-if="error.guestName">Inserire CVV</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 my-3">
                  <div v-if="this.totalItem <= 0" class="bg-danger mb-3">
                    <span class="ps-3">Carrello vuoto, effettua un ordine.</span>
                    <span class="fas fa-arrow-right"></span>
                  </div>
                  <button type="submit" v-else class="btn btn-warning mb-3">
                    <span class="ps-3">Paga €{{ this.totalItem }}</span>
                    <div v-show="payLoad" class="cell"></div>
                  </button>
                </div>

                <!-- <h3>Totale da pagare: € {{ this.totalItem }}</h3>

      <button type="submit" class="btn btn-primary mt-4">Invia dati</button> -->
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
