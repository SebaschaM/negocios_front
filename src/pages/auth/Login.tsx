import { Link } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

import styles from "../../styles/Auth.module.css";

function Login() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background_login}></div>
      <div className={styles.content}>
        <Link to="/">
          <button className={styles.back}>
            <BiChevronLeft />
          </button>
        </Link>
        <div className={styles.content_title}>
          <h1>Inicia Sesión</h1>
          <p>Bienvenido a nuestra página</p>
        </div>
        <form className={styles.content_form}>
          <input type="email" placeholder="Correo electronico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Ingresar</button>
          <p>
            ¿Aún no tienes una cuenta?{" "}
            <Link to={"/auth/register"}>Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
