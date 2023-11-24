import { createRouter, createWebHistory } from "vue-router";

/* importare le pagine  */
import HomePage from "./components/pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
  ],
});

export { router };
