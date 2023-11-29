import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPaperPlane, faCartShopping } from "@fortawesome/free-solid-svg-icons";

library.add(faPaperPlane);
library.add(faCartShopping);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

const eventBus = createApp({}); // Crea una nuova istanza di Vue per l'eventBus
app.config.globalProperties.$eventBus = eventBus;

app.mount("#app");
