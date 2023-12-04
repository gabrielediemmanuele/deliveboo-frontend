# TEMPLATE PER IL RESTAURANT 01/12/2023

```vue
<template>
  <!-- <RestaurantLayout /> -->
  <div class="row">
    <div class="card" v-for="dish in dishes" :key="dish.id + cartKey">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">{{ dish.price }}</p>
      <!-- <button type="button" class="btn btn-success" @click="added(dish)">
        +
      </button>

      <button class="btn btn-warning" type="button" @click="remove(dish.id)">
        -
      </button> -->
      <span
        class="btn btn-success d-flex align-items-center px-4 ms-add-btn"
        @click="added(dish)"
        >Aggiungi</span
      >
      <!-- <h3 class="mt-2" v-text="getQty(dish.id)"></h3> -->
      <!-- Altre informazioni sui piatti... -->
    </div>
    <!-- <div v-if="!totalItem == 0">
      <h3>Cart Total: ${{ totalItem }}</h3>
    </div>
    <h1 class="bg-primary text-center mt-5" v-else>Il tuo carrello è vuoto</h1> -->
  </div>
  <!-- Modale -->
  <div
    class="modal fade"
    id="restaurantMismatchModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="restaurantMismatchModalLabel"
    aria-hidden="true"
    :class="{ show: showModal, 'd-block': showModal }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="restaurantMismatchModalLabel">
            Attenzione!
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Non puoi aggiungere piatti di altri ristoranti al carrello.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="clearCart">
            Svuota Carrello
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Annulla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```
