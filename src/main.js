import { createApp } from "vue";

import "./assets/scss/style.scss";

import { router } from "./router";

import * as bootstrap from "bootstrap";

import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

import { faCoins } from "@fortawesome/free-solid-svg-icons";

import { faHouse } from "@fortawesome/free-solid-svg-icons";

library.add(faCartShopping, faCartArrowDown, faCoins, faHouse);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
