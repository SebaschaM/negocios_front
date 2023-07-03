import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/images/logo.png" alt="logo" />
      <div className={styles.footer_links}>
        <ul>
          <li>
            <Link to="">Inicio</Link>
          </li>
          <li>
            <Link to="">Productos</Link>
          </li>
          <li>
            <Link to="">Carrito</Link>
          </li>
        </ul>
        <ul></ul>
      </div>
    </footer>
  );
}
export default Footer;
