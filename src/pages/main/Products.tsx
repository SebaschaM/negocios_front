import { BiPlus } from "react-icons/bi";
import { Footer, Header } from "../../components";
import styles from "../../styles/Products.module.css";
import { Link } from "react-router-dom";

function Products() {
  return (
    <>
      <Header
        title="Productos"
        description="El poder está en tus manos, nosotros te proveemos las herramientas"
        image="/images/background_products.png"
      />
      <h2 className={styles.title}>Productos por categoría</h2>
      <div className={styles.products}>
        {Array.from(Array(3).keys()).map(() => (
          <div className={styles.cards_container}>
            <h2>Tubos PVC</h2>
            <div className={styles.cards}>
              {Array.from(Array(4).keys()).map(() => (
                <div className={styles.card}>
                  <img src="/images/producto1.png" alt="producto" />
                  <Link to="">
                    <p className={styles.card_name_product}>
                      PVC SAL TUBO 2"X3MTS LIVIANO MATUSITA
                    </p>
                  </Link>
                  <div className={styles.card_data}>
                    <div className={styles.card_data_price}>
                      <p>Precio:</p>
                      <span>S/ 20.00</span>
                    </div>
                    <button className={styles.card_data_add}>
                      <BiPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Products;
