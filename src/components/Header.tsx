import { Link, NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { useEffect, useState } from "react";
import photo from "/images/usuario.png";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  showHero?: boolean;
}

interface UserData {
  fullname?: string;
  phone?: string;
}

function Header({ title, description, image, showHero = true }: Props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  const checkUserLoggedIn = () => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsUserLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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
            {isUserLoggedIn && (
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
            )}
          </ul>
          {isUserLoggedIn ? (
            <Link to="/profile">
              <div className={styles.content_user_login}>
                <div className={styles.user_name}>
                  <p className={styles.nameHeader}>
                    {(userData as UserData).fullname}
                  </p>
                  <p className={styles.phoneHeader}>
                    {(userData as UserData).phone}
                  </p>
                </div>
                <div className={styles.user_photo}>
                  <img src={photo} alt="" />
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/auth/login">
              <button>Inicia Sesion</button>
            </Link>
          )}
        </nav>
        <img className={styles.background} src={image} alt="background" />
        <div className={styles.header_info}>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
      </div>
    );

  return (
    <>
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
            {isUserLoggedIn && (
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
            )}
          </ul>
          {isUserLoggedIn ? (
            <Link to="/profile">
              <div className={styles.content_user_login}>
                <div className={styles.user_name}>
                  <p className={styles.nameHeader}>
                    {(userData as UserData).fullname}
                  </p>
                  <p className={styles.phoneHeader}>
                    {(userData as UserData).phone}
                  </p>
                </div>
                <div className={styles.user_photo}>
                  <img src={photo} alt="" />
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/auth/login">
              <button>Inicia Sesion</button>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
export default Header;
