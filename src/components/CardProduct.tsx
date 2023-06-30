import { useState } from "react";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useAtom } from "jotai";

import { Product } from "../interfaces";
import { modalProductAtom } from "../store/modalProduct";
import styles from "../styles/Products.module.css";

interface Props {
  product: Product;
}

function CardProduct({ product }: Props) {
  const [, setModalProduct] = useAtom(modalProductAtom);
  const [count, setCount] = useState(1);

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
      <img src="/images/producto1.png" alt="producto" />
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
        <button className={styles.card_data_add}>
          <BiPlus />
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
