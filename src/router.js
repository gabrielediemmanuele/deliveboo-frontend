import { createRouter, createWebHistory } from "vue-router";

/* importare le pagine  */
import HomePage from "./components/pages/HomePage.vue";
import RestaurantPage from "./components/pages/RestaurantPage.vue";
import CheckoutPage from "./components/pages/CheckoutPage.vue";
import Thanks from "./components/pages/Thanks.vue";


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
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage,
    },
    {
      path: '/thankyou',
      name: 'thanks',
      component: Thanks,
    },
  ],
});

export { router };
