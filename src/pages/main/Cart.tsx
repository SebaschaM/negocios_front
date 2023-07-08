import {
  BiChevronRight,
  BiLogoMastercard,
  BiLogoVisa,
  BiMinus,
  BiPlus,
  BiTrash,
} from "react-icons/bi";

import { Header } from "../../components";
import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import { useAtom } from "jotai";
import {
  addOneToCountAtom,
  cartAtom,
  clearCartAtom,
  minuOneToCountAtom,
  removeFromCartAtom,
} from "../../store/cartProducts";
import { useOrder } from "../../hook/useOrder";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useAtom(cartAtom);
  const removeProduct = useAtom(removeFromCartAtom)[1];
  const addCountOneProduct = useAtom(addOneToCountAtom)[1];
  const minusountOneProduct = useAtom(minuOneToCountAtom)[1];
  const clearCart = useAtom(clearCartAtom)[1];
  const [user, setUser] = useState<{
    idUser: number;
    fullname: string;
    email: string;
  }>({ idUser: 0, fullname: "", email: "" });
  const { addOrder } = useOrder();
  const [cartUpdated, setCartUpdated] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const allSubTotal = cart.reduce((acc, product) => {
    return acc + product.priceTotal;
  }, 0);
  const allTotal = cart.reduce((acc, product) => {
    return acc + product.priceTotal;
  }, 0);

  useEffect(() => {
    getLocalStorageCart();
    setCartUpdated(false);
    setUser(JSON.parse(localStorage.getItem("user") ?? "0"));
  }, [true, cartUpdated]);

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
    if (Object.keys(errors).length > 0) {
      return toast.error("Llene los campos de pago", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const userLS: { email: string } = JSON.parse(
      localStorage.getItem("user") || '{"email": ""}'
    );

    if (userLS?.email === "") {
      return toast.error("Inicie sesion para realizar la compra", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    for (const product of cart) {
      const response = await addOrder({
        serial: 1,
        subtotal: product.subtotal,
        address: data.direction,
        total: product.priceTotal,
        quantity: product.quantity,
        purchase_date: new Date().toDateString(),
        description: "Description",
        user_id: user.idUser,
        product_id: product.product_id,
        fullname: user.fullname,
        email: user.email,
        productname: product.product_name,
      });
      reset();
      clearCart();
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.background}>
      <Header showHero={false} />
      <ToastContainer />
      <div className={styles.wrapper}>
        <div className={styles.cards}>
          {cart.map((product) => (
            <div key={product.product_id} className={styles.card}>
              <img
                src={product.product_url}
                className={styles.card_url}
                alt="producto"
              />
              <p className={styles.card_name}>{product.product_name}</p>
              <div className={styles.card_quantity}>
                <button
                  onClick={() => {
                    addCountOneProduct(product.product_id);
                    setCartUpdated(true);
                  }}
                >
                  <BiPlus />
                </button>
                <p>{product.quantity}</p>
                <button
                  onClick={() => {
                    if (product.quantity > 1) {
                      minusountOneProduct(product.product_id);
                      setCartUpdated(true);
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
              <input
                type="text"
                {...register("name_card", { required: true })}
              />
            </div>
            <div className={styles.pay_form_group}>
              <label>Numero de tarjeta</label>
              <input
                type="text"
                {...register("number_card", { required: true })}
              />
            </div>
            <div className={styles.pay_form_group_2}>
              <div className={styles.pay_form_group}>
                <label>Fecha de caducidad</label>
                <input
                  type="date"
                  {...register("expiration_card", { required: true })}
                />
              </div>
              <div className={styles.pay_form_group}>
                <label>CVV</label>
                <input
                  type="tel"
                  {...register("cvv_card", { required: true })}
                />
              </div>
            </div>
            <div className={styles.pay_form_group}>
              <label>Direccion</label>
              <input
                type="text"
                {...register("direction", { required: true })}
              />
            </div>
            <hr />
            <div className={styles.pay_form_group_resume_container}>
              <div className={styles.pay_form_group_resume}>
                <p>Subtotal</p>
                <p>S/ {allSubTotal.toFixed(2)}</p>
              </div>
              <div className={styles.pay_form_group_resume}>
                <p>Delivery</p>
                <p>
                  S/ {cart.length > 0 ? (5.0).toFixed(2) : (0.0).toFixed(2)}
                </p>
              </div>
              <div className={styles.pay_form_group_resume}>
                <p>Total</p>
                <p>
                  S/{" "}
                  {cart.length > 0 ? (allTotal + 5).toFixed(2) : (0).toFixed(2)}
                </p>
              </div>
              <div className={styles.pay_form_group_resume_button}>
                <p>
                  S/{" "}
                  {cart.length > 0 ? (allTotal + 5).toFixed(2) : (0).toFixed(2)}
                </p>
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
