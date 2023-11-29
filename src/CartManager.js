// import { store } from ".data/store";

// export function addToCart(product) {
//     const existingProductIndex = store.cartArray.findIndex(
//         (dish) => dish.id === product.id
//     );

//     if (existingProductIndex !== -1) {
//         // Se il prodotto è già presente nel carrello, aumenta la quantità
//         store.cartArray[existingProductIndex].count++;
//     } else {
//         // Altrimenti, aggiungi il prodotto al carrello con quantità 1
//         const newProduct = {
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             count: 1,
//         };
//         store.cartArray.push(newProduct);
//     }

//     // Aggiorna il totale e il numero di prodotti nel carrello
//     updateCartTotal();
// }