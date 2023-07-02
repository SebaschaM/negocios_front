import {
  BiChevronRight,
  BiLogoMastercard,
  BiLogoVisa,
  BiMinus,
  BiPlus,
  BiTrash,
} from "react-icons/bi";

import { Header } from "../../components";
import { useEffect } from "react";
import styles from "../../styles/Cart.module.css";
import { useAtom } from "jotai";
import {
  addOneToCountAtom,
  cartAtom,
  minuOneToCountAtom,
  removeFromCartAtom,
} from "../../store/cartProducts";
import { useOrder } from "../../hook/useOrder";
import { useForm } from "react-hook-form";
import { Order } from "../../interfaces/Order";

function Cart() {
  const [cart, setCart] = useAtom(cartAtom);
  const removeProduct = useAtom(removeFromCartAtom)[1];
  const addCountOneProduct = useAtom(addOneToCountAtom)[1];
  const minusountOneProduct = useAtom(minuOneToCountAtom)[1];
  const { addOrder } = useOrder();
  const { handleSubmit, register } = useForm();

  const allSubTotal = cart.reduce((acc, product) => {
    return acc + product.priceTotal;
  }, 0);
  const allTotal = cart.reduce((acc, product) => {
    return acc + product.priceTotal;
  }, 0);

  useEffect(() => {
    getLocalStorageCart();
  }, [setCart]);

  const getLocalStorageCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  };

  const removeProductIntCart = (product_id: number) => {
    removeProduct(product_id);
  };

  const addOrderToDB = async (data: any) => {
    const dataOrder = {
      subtotal: allSubTotal,
    };
    const response = await addOrder(data);
    console.log(response);
  };

  return (
    <div className={styles.background}>
      <Header showHero={false} />

      <div className={styles.wrapper}>
        <div className={styles.cards}>
          {cart.map((product) => (
            <div key={product.product_id} className={styles.card}>
              <img src="/images/producto1.png" alt="producto" />
              <p className={styles.card_name}>{product.product_name}</p>
              <div className={styles.card_quantity}>
                <button onClick={() => addCountOneProduct(product.product_id)}>
                  <BiPlus />
                </button>
                <p>{product.quantity}</p>
                <button
                  onClick={() => {
                    if (product.quantity > 1) {
                      minusountOneProduct(product.product_id);
                    }
                  }}
                >
                  <BiMinus />
                </button>
              </div>
              <p className={styles.card_subtotal}>
                S/ {product.subtotal.toFixed(2)}
              </p>
              <p className={styles.card_total}>
                S/ {product.priceTotal.toFixed(2)}
              </p>
              <BiTrash
                className={styles.trash}
                onClick={() => removeProductIntCart(product.product_id)}
              />
            </div>
          ))}
        </div>

        <div className={styles.pay}>
          <h2>Detalles de la tarjeta</h2>
          <div className={styles.pay_card}>
            <p>Tipo de tarjeta</p>
            <div className={styles.pay_type_card}>
              <BiLogoMastercard className={styles.option_type_card} />
              <BiLogoVisa className={styles.option_type_card} />
            </div>
          </div>
          <form
            className={styles.pay_form}
            onSubmit={handleSubmit(addOrderToDB)}
          >
            <div className={styles.pay_form_group}>
              <label>Nombre de tarjeta</label>
              <input type="text" {...register("name_card")} />
            </div>
            <div className={styles.pay_form_group}>
              <label>Numero de tarjeta</label>
              <input type="text" {...register("number_card")} />
            </div>
            <div className={styles.pay_form_group_2}>
              <div className={styles.pay_form_group}>
                <label>Fecha de caducidad</label>
                <input type="date" {...register("expiration_card")} />
              </div>
              <div className={styles.pay_form_group}>
                <label>CVV</label>
                <input type="tel" {...register("cvv_card")} />
              </div>
            </div>
            <hr />
            <div className={styles.pay_form_group_resume_container}>
              <div className={styles.pay_form_group_resume}>
                <p>Subtotal</p>
                <p>S/ {allSubTotal.toFixed(2)}</p>
              </div>
              <div className={styles.pay_form_group_resume}>
                <p>Delivery</p>
                <p>S/ 5.00</p>
              </div>
              <div className={styles.pay_form_group_resume}>
                <p>Total</p>
                <p>S/ {(allTotal + 5).toFixed(2)}</p>
              </div>
              <div className={styles.pay_form_group_resume_button}>
                <p>S/ {(allTotal + 5).toFixed(2)}</p>
                <button>
                  Pagar ahora <BiChevronRight />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;
