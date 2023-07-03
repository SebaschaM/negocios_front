import { useState, useEffect } from "react";
import { BiChevronRight, BiMinus, BiPlus } from "react-icons/bi";
import { useAtom } from "jotai";
import { ToastContainer, toast } from "react-toastify";

import { CardProduct, Footer, Header } from "../../components";
import useFetch from "../../hook/useFetch";
import { Category, Product } from "../../interfaces";
import { modalProductAtom } from "../../store/modalProduct";
import styles from "../../styles/Products.module.css";
import { addToCartAtom } from "../../store/cartProducts";
import { OrderCart } from "../../interfaces/CartProduct";

function Products() {
  const { getCategoryList, getListProducts } = useFetch();
  const addToCart = useAtom(addToCartAtom)[1];
  const [category, setCategory] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useAtom(modalProductAtom);
  const [modalCount, setModalCount] = useState(1);
  const notify = () =>
    toast.success("Producto agregado al carrito", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  useEffect(() => {
    handleListCategories();
    handleListProducts();
  }, []);

  const handleListCategories = async () => {
    const categories = await getCategoryList();
    setCategory(categories);
  };

  const handleListProducts = async () => {
    const data = await getListProducts();
    setProducts(data);
  };

  const handleAddToCartInModal = (product: Product) => {
    const order: OrderCart = {
      product_id: product.idProduct,
      product_url: product.url,
      product_name: product.name,
      quantity: modalCount,
      subtotal: product.price,
      priceTotal: modalCount * product.price,
    };
    addToCart(order);
    notify();
  };

  return (
    <>
      <Header
        title="Productos"
        description="El poder está en tus manos, nosotros te proveemos las herramientas"
        image="/images/background_products.png"
      />
      {!modalProduct.showModal && <ToastContainer />}
      <h2 className={styles.title}>Productos por categoría</h2>
      <div className={styles.products}>
        {category.map((category) => (
          <div className={styles.cards_container} key={category.idCategory}>
            <h2>{category.name}</h2>
            <div className={styles.cards}>
              {products
                .filter(
                  (product) => product.category_id === category.idCategory
                )
                .map((product) => (
                  <CardProduct
                    key={product.idProduct}
                    product={product}
                    notify={notify}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />

      {modalProduct.showModal && modalProduct.product && (
        <div
          className={styles.modal}
          onClick={() => {
            setModalProduct({
              showModal: false,
              product: null,
            });
            setModalCount(1);
          }}
        >
          {modalProduct.showModal && <ToastContainer />}
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal_head}>
              <p className={styles.modal_description_title}>Detalle Producto</p>
              <p className={styles.modal_description}>
                {modalProduct.product.description}
              </p>
            </div>
            <div className={styles.modal_detail_product}>
              <img
                className={styles.modal_product_img}
                // src={modalProduct.product.url}
                src={modalProduct.product.url}
                alt={modalProduct.product.name}
              />
              <div className={styles.modal_product_container}>
                <div className={styles.modal_product_info}>
                  <p className={styles.modal_product_name}>
                    {modalProduct.product.name}
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <td className={styles.modal_description_td}>Stock:</td>
                        <td className={styles.modal_description_td}>
                          Precio unitario:
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.modal_description_tbody}>
                          {modalProduct.product.stock}
                        </td>
                        <td className={styles.modal_description_tbody}>
                          S/ {modalProduct.product.price}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.modal_product_quantity}>
                  <button className={styles.btn_event}>
                    <BiMinus
                      onClick={() => {
                        if (modalCount > 1) {
                          setModalCount((prevCount) => prevCount - 1);
                        }
                      }}
                    />
                  </button>
                  <p className={styles.product_quantity}>{modalCount}</p>
                  <button className={styles.btn_event}>
                    <BiPlus
                      onClick={() => {
                        if (
                          modalProduct.product?.stock &&
                          modalCount < modalProduct.product.stock
                        ) {
                          setModalCount((prevCount) => prevCount + 1);
                        }
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.modal_cart_option}>
              <p className={styles.product_price_cart}>
                S/ {(modalCount * modalProduct.product.price).toFixed(2)}
              </p>
              <button
                className={styles.btn_event_add}
                onClick={() => handleAddToCartInModal(modalProduct.product!!)}
              >
                <div className={styles.btn_cart}>
                  <p className={styles.txt_add_cart}>Agregar al carrito</p>
                  <BiChevronRight />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
