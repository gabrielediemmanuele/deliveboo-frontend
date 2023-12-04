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
  },
};
</script>
<template>
  <div>
    <!-- Contenuto del carrello -->

    <div v-for="item in cart" :key="item.id">
      {{ item.name }} - {{ item.price }} - Qty: {{ item.qty }}
      <button @click="removeFromCart(item.id)">Remove</button>
      <button @click="addToCart(item)">Aggiungi</button>
    </div>

    <!-- Totale carrello -->
    <div>Cart Total: €{{ totalItem }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
