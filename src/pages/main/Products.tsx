import { BiPlus } from "react-icons/bi";
import { Footer, Header } from "../../components";
import styles from "../../styles/Products.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hook/useFetch";

function Products() {
  interface Product {
    idProduct: number;
    name: string;
    description: string;
    url: string;
    price: number;
    stock: number;
    category_id: number;
  }

  interface Category {
    idCategory: number;
    name: string;
  }

  const { getCategoryList, getListProducts, getDetailProduct } = useFetch();
  const [category, setCategory] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);
  const [modalCount, setModalCount] = useState(1);
  const [count, setCount] = useState(1);

  const handleListCategories = async () => {
    const categories = await getCategoryList();
    //setProducts(data);
    setCategory(categories);
  };

  const handleDetailProduct = async (productId: number) => {
    try {
      const data = await getDetailProduct(productId.toString());
      setProductData(data[0]);
      console.log(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  const getCartItemCount = (productId: string): number => {
    const cartItems: { id: string; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const existingProduct = cartItems.find((item) => item.id === productId);
    return existingProduct ? existingProduct.quantity : 0;
  };

  const addToCart = (selectedProduct: Product) => {
    // Obtener el carrito actual del localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cartItems.find(
      (item) => item.id === selectedProduct.id
    );

    if (existingProduct) {
      // Si el producto existe, incrementar la cantidad
      if (existingProduct.quantity + modalCountValue <= selectedProduct.stock) {
        existingProduct.quantity += modalCountValue;
      } else {
        // Mostrar mensaje de error o realizar alguna acción adecuada cuando se excede el stock
        console.log("No se puede agregar más del stock máximo");
        return; // Salir de la función sin actualizar el carrito
      }
    } else {
      const productToAdd = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity:
          modalCountValue <= selectedProduct.stock
            ? modalCountValue
            : selectedProduct.stock,
      };

      cartItems.push(productToAdd);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Cerrar el modal y reiniciar el contador
    setShowModalProduct(false);
    setModalCount(1);
  };

  // Variable para almacenar el valor actual de modalCount
  const modalCountValue = modalCount;
*/
  const handleListProducts = async () => {
    try {
      const data = await getListProducts();
      setProducts(data);
      console.log("Productos por categoría:", data);
    } catch (error) {
      console.error(
        "Error al obtener la lista de productos por categoría:",
        error
      );
    }
  };

  useEffect(() => {
    handleListCategories();
    handleListProducts();
  }, []);

  return (
    <>
      <Header
        title="Productos"
        description="El poder está en tus manos, nosotros te proveemos las herramientas"
        image="/images/background_products.png"
      />
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
                  <div
                    className={styles.card}
                    key={product.idProduct}
                    onClick={(e) => {
                      setShowModalProduct(true);
                      handleDetailProduct(product.idProduct);
                    }}
                  >
                    <img src={product.url} alt="producto" />
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
                          console.log(
                            "No se puede agregar más del stock máximo"
                          );
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
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
      {/* MODAL */}
      {showModalProduct && productData && (
        <div
          className={styles.modal}
          onClick={() => {
            setShowModalProduct(false);
          }}
        >
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal_head}>
              <p className={styles.modal_description_title}>Detalle Producto</p>
              <p className={styles.modal_description_id}>
                {productData.idProduct}
              </p>
              <p className={styles.modal_description}>
                Agrega productos al carrito para poder comprarlos y selecciona
                la cantidad deseada.
              </p>
            </div>
            <div className={styles.modal_detail_product}>
              <img
                className={styles.modal_product_img}
                src={productData.url}
                alt={productData.name}
              />
              <div className={styles.modal_product_container}>
                <div className={styles.modal_product_info}>
                  <p className={styles.modal_product_name}>
                    {productData.name}
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <td className={styles.modal_description_td}>
                          Detalle:
                        </td>
                        <td className={styles.modal_description_td}>
                          Precio unitario:
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.modal_description_tbody}>
                          {productData.description}
                        </td>
                        <td className={styles.modal_description_tbody}>
                          S/ {productData.price}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.modal_product_quantity}>
                  <button
                    className={styles.btn_event}
                    onClick={() => {
                      if (modalCount > 1) {
                        setModalCount((prevCount) => prevCount - 1);
                      }
                    }}
                  >
                    <svg
                      strokeWidth="1.9"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12h12"
                        stroke="#FFFFFF"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <p className={styles.product_quantity}>{modalCount}</p>
                  <button
                    className={styles.btn_event}
                    onClick={() => {
                      const quantityFromLocalStorage =
                        localStorage.getItem("quantity");
                      const quantity = parseInt(
                        quantityFromLocalStorage ?? "0"
                      );
                      const maxCount = productData.stock - quantity;

                      if (modalCount < maxCount) {
                        setModalCount((prevCount) => prevCount + 1);
                      }
                    }}
                  >
                    <svg
                      strokeWidth="1.9"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                        stroke="#FFFFFF"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.modal_cart_option}>
              <p className={styles.product_price_cart}>
                S/ {modalCount * productData.price}
              </p>
              <button
                className={styles.btn_event_add}
                //onClick={() => addToCart(productData)}
              >
                <div className={styles.btn_cart}>
                  <p className={styles.txt_add_cart}>Agregar al carrito</p>
                  <svg
                    className={styles.btn_add_cart}
                    strokeWidth="1.9"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="#000000"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
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
