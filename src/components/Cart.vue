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
            // totalPrice() {
            //     return store.totalPrice.toFixed(2); // Formatta il prezzo totale a due decimali
            // }
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
    <div class="cart">
        <h2>Il tuo Carrello</h2>

        <!-- Lista dei prodotti nel carrello -->
        <ul v-if="cartItems.length > 0">
            <li v-for="(item, index) in cartItems" :key="index">
                <span>{{ item . name }}</span>
                <span>Prezzo: €{{ item . price }}</span>
                <span>Quantità: {{ item . count }}</span>
                <button @click="removeFromCart(index)">Rimuovi</button>
            </li>
        </ul>
        <p v-else>Il carrello è vuoto</p>

        <!-- Totale e pulsanti -->
        <div v-if="cartItems.length > 0">
            <p>Totale: €{{ totalPrice }}</p>
            <button @click="checkout">Checkout</button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
