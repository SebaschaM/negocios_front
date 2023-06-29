import { Link, NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  showHero?: boolean;
}

function Header({ title, description, image, showHero = true }: Props) {
  if (showHero)
    return (
      <div className={styles.header}>
        <nav className={styles.nav}>
          <img src="/images/logo.png" alt="logo" />
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.active_link}` : ""
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.active_link}` : ""
                }
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.active_link}` : ""
                }
              >
                Carrito
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.active_link}` : ""
                }
              >
                Pedidos
              </NavLink>
            </li>
          </ul>
          <Link to="/auth/login">
            <button>Inicia Sesion</button>
          </Link>
        </nav>
        <img className={styles.background} src={image} alt="background" />
        <div className={styles.header_info}>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
      </div>
    );

  return (
    <div className={styles.header_no_hero}>
      <nav className={styles.nav}>
        <img src="/images/logo.png" alt="logo" />
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.active_link}` : ""
              }
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                isActive ? `${styles.active_link}` : ""
              }
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              end
              className={({ isActive }) =>
                isActive ? `${styles.active_link}` : ""
              }
            >
              Carrito
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              end
              className={({ isActive }) =>
                isActive ? `${styles.active_link}` : ""
              }
            >
              Pedidos
            </NavLink>
          </li>
        </ul>
        <Link to="/auth/login">
          <button>Inicia Sesion</button>
        </Link>
      </nav>
    </div>
  );
}
export default Header;
