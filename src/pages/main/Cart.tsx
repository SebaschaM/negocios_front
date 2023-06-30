import {
  BiLogoMastercard,
  BiLogoVisa,
  BiMinus,
  BiPlus,
  BiTrash,
} from "react-icons/bi";

import { Header } from "../../components";
import styles from "../../styles/Cart.module.css";

function Cart() {
  return (
    <div className={styles.background}>
      <Header showHero={false} />

      <div className={styles.wrapper}>
        <div className={styles.cards}>
          {Array.from(Array(3).keys()).map(() => (
            <div className={styles.card}>
              <img src="/images/producto1.png" alt="producto" />
              <p>Tubo PVC</p>
              <div className={styles.card_quantity}>
                <button>
                  <BiPlus />
                </button>
                <p>1</p>
                <button>
                  <BiMinus />
                </button>
              </div>
              <p>S/ 100.00</p>
              <BiTrash className={styles.trash} />
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
          <form className={styles.pay_form}>
            <div className={styles.pay_form_group}>
              <label>Nombre de tarjeta</label>
              <input type="text" />
            </div>
            <div className={styles.pay_form_group}>
              <label>Numero de tarjeta</label>
              <input type="text" />
            </div>
            <div>
              <div className={styles.pay_form_group}>
                <label>Fecha de caducidad</label>
                <input type="date" />
              </div>
              <div className={styles.pay_form_group}>
                <label>CVV</label>
                <input type="tel" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;
