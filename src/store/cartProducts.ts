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
    existingOrder.priceTotal = existingOrder.quantity * existingOrder.subtotal;
  } else {
    cart.push(order);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  set(cartAtom, cart);
});

export const removeFromCartAtom = atom(null, (get, set, productId: number) => {
  const cart = get(cartAtom);
  const updatedCart = cart.filter((item) => item.product_id !== productId);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  set(cartAtom, updatedCart);
});

export const addOneToCountAtom = atom(null, (get, set, productId: number) => {
  const cart = get(cartAtom);
  const existingOrder = cart.find((item) => item.product_id === productId);

  if (existingOrder) {
    existingOrder.quantity += 1;
    existingOrder.priceTotal += existingOrder.subtotal;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  set(cartAtom, cart);
});

export const minuOneToCountAtom = atom(null, (get, set, productId: number) => {
  const cart = get(cartAtom);
  const existingOrder = cart.find((item) => item.product_id === productId);

  if (existingOrder) {
    existingOrder.quantity -= 1;
    existingOrder.priceTotal -= existingOrder.subtotal;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  set(cartAtom, cart);
});
