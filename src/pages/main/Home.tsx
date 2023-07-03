import { CardProduct, Footer, Header } from "../../components";
import {
  BiPlus,
  BiLocationPlus,
  BiCalendar,
  BiPhone,
  BiMailSend,
  BiSolidShareAlt,
  BiLogoFacebook,
  BiLogoInstagram,
  BiUser,
} from "react-icons/bi";
import styles from "../../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Category, Product } from "../../interfaces";
import useFetch from "../../hook/useFetch";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const productsCopy = [...products];
  productsCopy.sort(() => Math.random() - 0.5);
  const randomProducts = productsCopy.slice(0, 5);

  const { getCategoryList, getListProducts } = useFetch();
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

  return (
    <>
      <Header
        title="En nuestra ferretería, construimos sueños con calidad y pasión"
        description="Herramientas de confianza, resultados duraderos"
        image="/images/background_home.png"
      />
      <ToastContainer />
      <section className={styles.home_categories}>
        <h2>Nuestras Categorías</h2>
        <div className={styles.cards}>
          {category.map((category) => (
            <div className={styles.card}>
              <img
                src={category.url}
                className={styles.card_category}
                alt="calamina"
              />
              <p className={styles.card_name_category}>{category.name}</p>
            </div>
          ))}
          {/* <div className={styles.card}>
            <img src="/images/calamina.png" alt="calamina" />
            <p className={styles.card_name_category}>Calaminas</p>
          </div>
          <div className={styles.card}>
            <img src="/images/fierros.png" alt="fierros" />
            <p className={styles.card_name_category}>Fierros de construccion</p>
          </div>
          <div className={styles.card}>
            <img src="/images/tubos.png" alt="tubos" />
            <p className={styles.card_name_category}>Tubos PVC</p>
          </div> */}
        </div>
      </section>
      <section className={styles.home_products}>
        <h2>Nuestros Productos</h2>
        <div className={styles.cards}>
          {randomProducts.map((product) => (
            <CardProduct
              key={product.idProduct}
              product={product}
              notify={notify}
            />
          ))}
          {/* <div className={styles.card}>
            <img src="/images/producto1.png" alt="calamina" />
            <p className={styles.card_name}>
              PVC C10 CODO 3/4"X90øC/R MATUSITA
            </p>
            <div className={styles.card_data}>
              <div className={styles.card_data_price}>
                <p>Precio:</p>
                <span>S/ 20.00</span>
              </div>
              <button className={styles.card_data_add}>
                <BiPlus />
              </button>
            </div>
          </div> */}
        </div>
        <Link to="products">
          <button className={styles.button_products}>Ver productos</button>
        </Link>
      </section>

      <section className={styles.about}>
        <h2>Sobre Nosotros</h2>
        <p className={styles.about_info}>
          Somos una empresa dedicada a la distribución y comercialización de
          productos para la Construcción en General, siendo una empresa que
          inicio sus operaciones en el año 1988 bajo la premisa de contribuir
          con sus proyectos de construcción, nuestros productos compiten con
          éxito a nivel nacional, ya que contamos con marcas de reconocida
          calidad que buscan darle el mayor beneficio a nuestros clientes,
          comerciantes, corporativos y usuarios finales.
        </p>
        <p className={styles.about_info}>
          Nuestro éxito se basa en la búsqueda permanente de la superación, para
          poder brindar la entera satisfacción a nuestros clientes.
        </p>
        <div className={styles.about_mision}>
          <p>
            MISION <br /> Distribuir productos de calidad que superen las
            expectativas de nuestros clientes y mejorar constantemente en
            nuestros servicios.
          </p>
          <p>
            VISION <br /> Ser una empresa reconocida por su crecimiento
            sostenido y su liderazgo en el sector de la construcción naciona
          </p>
        </div>

        <div className={styles.about_cards_1}>
          <div className={styles.about_card}>
            <div>
              <BiLocationPlus />
              Direccion
            </div>
            <a
              href="https://goo.gl/maps/BkSRFMVEEH9QSDNMA"
              className={styles.about_address}
            >
              Av Pablo Patrón 211-223
            </a>
            <p>Lima - La Victoria</p>
          </div>
          <div className={styles.about_card}>
            <div>
              <BiPhone />
              Telefonos
            </div>
            <p>+51 977 383 562</p>
            <p>+51 981 004 133 </p>
          </div>
          <div className={styles.about_card}>
            <div>
              <BiMailSend />
              Correo electronico
            </div>
            <p>trefisaproyecto@gmail.com</p>
          </div>
        </div>

        <div className={styles.about_cards_2}>
          <div className={styles.about_card}>
            <div>
              <BiCalendar />
              Horario de atencion
            </div>
            <p>Lunes - Sábado:</p>
            <p>08:00 am - 18:00 pm</p>
          </div>
          <div className={styles.about_card}>
            <div>
              <BiSolidShareAlt />
              Siguenos en
            </div>
            <div className={styles.about_card_follows}>
              <div className={styles.about_card_follow}>
                <BiLogoFacebook />
                Facebook
              </div>
              <div className={styles.about_card_follow}>
                <BiLogoInstagram />
                Instagram
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <h2>Contactanos</h2>
        <div className={styles.contact_wrapper}>
          <form className={styles.contact_form}>
            <div className={styles.contact_form_group}>
              <label>Nombres</label>
              <input type="text" />
            </div>
            <div className={styles.contact_form_group}>
              <label>Email</label>
              <input type="text" />
            </div>
            <div className={styles.contact_form_group}>
              <label>Telefono</label>
              <input type="text" />
            </div>
            <div className={styles.contact_form_group}>
              <label>Mensaje</label>
              <textarea cols={30} rows={10}></textarea>
            </div>
            <button>Enviar Mensaje</button>
          </form>

          <div className={styles.contact_comment}>
            <p>
              “En nuestra ferretería, te recibimos con los brazos abiertos para
              ayudarte a construir tus proyectos con calidad y precisión. Aquí,
              junto a nuestro equipo experto, nos apasiona dar vida a tus ideas,
              proporcionándote las herramientas y materiales adecuados que te
              llevarán al éxito en cada paso del camino”
            </p>
            <div className={styles.contact_comment_gerent}>
              <BiUser />
            </div>
            <p>Pablo Modesto Cucho Gamarra - Gerente</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
