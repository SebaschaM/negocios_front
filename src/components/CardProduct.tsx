import { useState } from "react";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useAtom } from "jotai";

import { Product } from "../interfaces";
import { modalProductAtom } from "../store/modalProduct";
import { addToCartAtom } from "../store/cartProducts";
import { OrderCart } from "../interfaces/CartProduct";
import styles from "../styles/Products.module.css";

interface Props {
  product: Product;
  notify: () => void;
}

function CardProduct({ product, notify }: Props) {
  const [, setModalProduct] = useAtom(modalProductAtom);
  const [count, setCount] = useState(1);
  const addToCart = useAtom(addToCartAtom)[1];

  const handleAddToCart = (product: Product) => {
    const order: OrderCart = {
      product_id: product.idProduct,
      product_url: product.url,
      product_name: product.name,
      quantity: 1,
      subtotal: product.price,
      priceTotal: product.price,
    };
    addToCart(order);
    notify();
  };

  return (
    <div
      className={styles.card}
      key={product.idProduct}
      onClick={() => {
        setModalProduct({
          showModal: true,
          product: product,
        });
      }}
    >
      {/* <img src={product.url} alt="producto" /> */}
      <img src={product.url} className={styles.card_product} alt="producto" />
      <Link to="">
        <p className={styles.card_name_product}>{product.name}</p>
      </Link>
      <div
        className={styles.card_data}
        onClick={(e) => {
          e.stopPropagation();
          const newCount = count;
          if (newCount <= product.stock) {
            //addToCart(product);
            setCount(newCount);
          } else {
            console.log("No se puede agregar más del stock máximo");
          }
        }}
      >
        <div className={styles.card_data_price}>
          <p>Precio:</p>
          <span>S/ {product.price}</span>
        </div>
        <button
          className={styles.card_data_add}
          onClick={() => handleAddToCart(product)}
        >
          <BiPlus />
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
