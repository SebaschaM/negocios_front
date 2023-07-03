import { BiChevronRight } from "react-icons/bi";
import { Header } from "../../components";
import styles from "../../styles/Order.module.css";
import { useEffect, useState } from "react";
import { useOrder } from "../../hook/useOrder";
import { OrderList } from "../../interfaces/OrderList";

function Order() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productSelected, setProductSelected] = useState({} as OrderList);
  const { getOrders } = useOrder();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") ?? "{}");
    getAllOrders(userData.id);
  }, []);

  const getAllOrders = async (id: number) => {
    const response = await getOrders(id);
    setOrders(response);
  };

  return (
    <>
      <div className={styles.background}>
        <Header showHero={false} />
        <div className={styles.wrapper}>
          <div className={styles.card_header}>
            <h2>Pedidos</h2>
            <p>
              En esta sección puedes visualizar el detalle de tus pedidos
              pendientes
            </p>
          </div>
          {orders.map((order: OrderList) => (
            <div key={order.idOrder} className={styles.card_order}>
              <div className={styles.card_order_info}>
                <h2>Código de Pedido N° {order.idOrder}</h2>
                <p>Producto: {order.name}</p>
                <p>Precio total: {order.total}</p>
                <p>
                  Fecha de compra:{" "}
                  {new Date(order.purchase_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(true);
                  setProductSelected(order);
                }}
              >
                Ver pedido <BiChevronRight />
              </button>
            </div>
          ))}
        </div>
        {/* Modal */}
        {showModal && (
          <div
            className={styles.modal}
            onClick={() => {
              setShowModal(false);
            }}
          >
            <div
              className={styles.modal_content}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2>Detalle pedido</h2>
              <p>Código de Pedido N° {productSelected.idOrder}</p>
              <p>Producto: {productSelected.name}</p>
              <p>
                Fecha de compra:{" "}
                {new Date(productSelected.purchase_date).toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
              </p>
              <hr />
              <div className={styles.modal_detail}>
                <img
                  src={productSelected.url}
                  className={styles.modal_product_img}
                  alt="producto"
                />
                <div className={styles.modal_detail_info}>
                  <p>
                    Precio Unitario: S/ {productSelected.subtotal.toFixed(2)}
                  </p>
                  <p>Cantidad: {productSelected.quantity}</p>
                </div>
                <p>Total: S/{productSelected.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Order;
