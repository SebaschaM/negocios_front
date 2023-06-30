import { atom } from "jotai";
import { Product } from "../interfaces";

interface ModalProductoI {
  showModal: boolean;
  product: Product | null;
}

export const modalProductAtom = atom<ModalProductoI>({
  showModal: false,
  product: null,
});
