import { atom } from "jotai";
import { OrderCart } from "../interfaces/CartProduct";

export const cartAtom = atom<OrderCart[]>([]);

export const addToCartAtom = atom(null, (get, set, order: OrderCart) => {
  const cart = get(cartAtom);
  const existingOrder = cart.find(
    (item) => item.product_id === order.product_id
  );

  if (existingOrder) {
    existingOrder.quantity += order.quantity;
    existingOrder.subtotal += order.subtotal;
  } else {
    cart.push(order);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  set(cartAtom, cart);
});
