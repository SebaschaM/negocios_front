import { Link } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import useAuth from "../../hook/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/Auth.module.css";

function Login() {
  const { loginUser } = useAuth();
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      const userData = await loginUser(email, password);
      const { fullname, phone, dni } = userData;

      console.log(userData);

      const user = {
        email: email,
        fullname: fullname,
        phone: phone,
        dni: dni,
      };
      notify("Inicio de sesión exitoso", "success");
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        navigate("/"); // Redirect to the home page after successful login
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Error al iniciar sesión") {
          notify("Correo y/o contraseña incorrectos", "error");
        } else {
          notify("Error al iniciar sesión", "error");
        }
      } else {
        notify(error as string, "error");
      }
    }
  };
  return (
    <>
      <ToastContainer />
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
          <form className={styles.content_form} onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Correo electronico" />
            <input type="password" name="password" placeholder="Contraseña" />
            <button type="submit">Ingresar</button>
            <p>
              ¿Aún no tienes una cuenta?{" "}
              <Link to={"/auth/register"}>Regístrate</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
