<script>
    import {
        computed
    } from 'vue';
    import {
        store
    } from './store';
    import {
        removeFromCart
    } from './CartManager';

    export default {
        computed: {
            cartItems() {
                return store.cartArray;
            },
            totalPrice() {
                return store.totalPrice.toFixed(2); // Formatta il prezzo totale a due decimali
            }
        },
        methods: {
            removeFromCart(index) {
                removeFromCart(index); // Chiamata alla funzione per rimuovere un prodotto dal carrello
            },
            checkout() {
                // Logica per il checkout
                // Puoi reindirizzare l'utente alla pagina di checkout o implementare ulteriori azioni qui
                console.log('Esegui il checkout!');
            }
        }
    };
</script>

<template>
    <font-awesome-icon icon="cart-shopping" />
</template>

<style lang="scss" scoped></style>
