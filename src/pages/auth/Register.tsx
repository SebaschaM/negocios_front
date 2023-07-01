import { Link } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import styles from "../../styles/Auth.module.css";

function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const notify = (message: string, type: "success" | "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullname = e.currentTarget.fullname.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const phone = e.currentTarget.phone.value;
    // const dni = e.currentTarget.dni.value;

    try {
      const userData = await registerUser(email, password, fullname, phone); //dni

      console.log(userData);

      notify("Registro exitoso", "success");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
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
          <form className={styles.content_form} onSubmit={handleRegister}>
            <input type="text" name="fullname" placeholder="Nombre completo" />
            <input type="email" name="email" placeholder="Correo electronico" />
            <input type="password" name="password" placeholder="Contraseña" />
            <input type="text" name="phone" placeholder="Celular" />
            <input type="text" name="dni" placeholder="DNI" />
            <button type="submit">Registrar</button>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to={"/auth/login"}>Inicia sesion</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
