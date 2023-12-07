//

```javascript
//SI DEVONO PORTARE IN PAYMENTFORM TUTTI I DATI E LE FUNZIONI :CART,QUANTITA,Totale
// Si devono passare i dati in mounted (ovvero quando il componente è stato "montato" sulla pagina. Questo è il momento ideale per effettuare operazioni di inizializzazione, come ad esempio richieste di dati da un server().

mounted{
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.forEach(element => {
    const quantity = element.count;
    const item_id = element.item_id;
    this.productsArray.push({ quantity, item_id }); //  salva le coppie chiavi valori che interessano
    });
}

methods: {
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
}
 // Si fa una richiesta GET al backend
 axios
    .get(`${this.Url}/api/generate/token`) //Questa richiesta serve a ottenere un token per l'autorizzazione del client Braintree.
.then(resp => {
                braintree.client.create({
                    authorization: resp.data.token
                }) //Viene creato un client Braintree utilizzando il token ottenuto dalla risposta del backend. Questo client Braintree è necessario per l'autenticazione con Braintree.


//Utilizzando il client Braintree appena creato, vengono creati i campi ospitati (hosted fields) per l'inserimento delle informazioni della carta. Questi campi sono configurati in base alle opzioni definite nell'oggetto options.
                .then(clientInstance => {
                        let options = {
                            client: clientInstance,
                            styles: {
                                input: {
                                    'font-size': '14px',
                                    'font-family': 'Open Sans'
                                }
                            },
                            fields: {
                                number: {
                                    selector: '#creditCardNumber',
                                    placeholder: 'Inserisci numero carta'
                                },
                                cvv: {
                                    selector: '#cvv',
                                    placeholder: 'Inserisci CVV'
                                },
                                expirationDate: {
                                    selector: '#expireDate',
                                    placeholder: 'MM / AAAA'
                                }
                            }
                        };
                        this.isLoading = false;
                        return braintree.hostedFields.create(options);
                    })
                    .then(hostedFieldInstance => {
                        console.log(hostedFieldInstance);
                        this.hostedFieldInstance = hostedFieldInstance;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.isLoading = false;
                    });
            })
    },

 //Dopodiché viene effettuata una richiesta POST verso il backend per eseguire il pagamento dentro lo script . quando l'utente preme il pulsante di pagamento @click.prevent="payWithCard" che dovrebbe stare dentro il template si attiva la richiesta POST
 //viene chiamato il metodo payWithCard

``javascript
methods{
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
               if (this.hostedFieldInstance) {
                   this.payLoad = true;
                   this.loading = true;
                   this.error = "";
                   this.hostedFieldInstance.tokenize().then(payload => {
                       console.log(payload.nonce);
                       axios.post(`${this.myUrl}/api/make/payment`, {
                           "products": this.productsArray,
                           "token": 'fake-valid-nonce',
                           "guest_name": this.guestName,
                           "guest_lastname": this.guestLastname,
                           "guest_phone": this.guestPhone,
                           "guest_address": this.guestAddress,
                           "guest_mail": this.guestMail,
                       }).then(resp => {
                           this.loading = false;
                           console.log(resp);
                           // alert("Payment successful!");

                       }).catch(err => {
                           console.log(err);
                       }).finally(() => {
                           this.payLoad = false;
                           this.loading = false;
                           this.clearCart(); //per il svuota
                           this.$router.push('/thankyou');
                       });
                   })
               }
           }
       }
   };
}
template form
```
