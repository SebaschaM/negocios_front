import { Link } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

import styles from "../../styles/Auth.module.css";

function Register() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background_register}></div>
      <div className={styles.content}>
        <Link to="/">
          <button className={styles.back}>
            <BiChevronLeft />
          </button>
        </Link>
        <div className={styles.content_title}>
          <h1>Registrate</h1>
          <p>Bienvenido a nuestra página</p>
        </div>
        <form className={styles.content_form}>
          <input type="text" placeholder="Nombre completo" />
          <input type="email" placeholder="Correo electronico" />
          <input type="password" placeholder="Contraseña" />
          <input type="text" placeholder="Celular" />
          <button type="submit">Registrar</button>
          <p>
            ¿Ya tienes una cuenta? <Link to={"/auth/login"}>Inicia sesion</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
