import { createRouter, createWebHistory } from "vue-router";

/* importare le pagine  */
import HomePage from "./components/pages/HomePage.vue";
import RestaurantPage from "./components/pages/RestaurantPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurant:restaurantId",
      name: "restaurant",
      component: RestaurantPage,
    },
  ],
});

export { router };
