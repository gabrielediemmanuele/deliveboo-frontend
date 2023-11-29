import { reactive } from "vue";

export const store = reactive({
    cartArray: [],
    totalPrice: 0.0,
    totalProducts: 0,
});