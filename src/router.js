import { createRouter, createWebHistory } from "vue-router";

/* importare le pagine  */
import HomePage from "./components/pages/HomePage.vue";
import RestaurantPage from "./components/pages/RestaurantPage.vue";
import PaymentForm from "./components/pages/PaymentForm.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurant/:restaurantId",
      name: "restaurant",
      component: RestaurantPage,
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentForm,
    },

  ],
});

export { router };
