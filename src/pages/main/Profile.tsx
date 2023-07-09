import { Header } from "../../components";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import styles from "../../styles/Profile.module.css";

interface UserData {
  id?: number;
  fullname?: string;
  email?: string;
  phone?: string;
  dni_ruc?: string;
  password?: string;
}

function Profile() {
  const { updateProfile } = useFetch();
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState<
    "personal" | "actualizacion"
  >("personal");
  const [userData, setUserData] = useState<UserData>({
    fullname: "",
    email: "",
    phone: "",
    dni_ruc: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getUserData = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  };

  const handleSaveUpdateUser = async () => {
    try {
      if (
        userData.id &&
        userData.fullname &&
        userData.email &&
        userData.phone &&
        userData.dni_ruc &&
        userData.password
      ) {
        const response = await updateProfile(userData.id.toString(), userData);
        if (response) {
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error al actualizar los datos del usuario");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.background}>
      <Header showHero={false} />

      <div className={styles.profile_contariner}>
        <div className={styles.profile_options}>
          <p className={styles.profile_tittle}>Perfil</p>
          <p className={styles.profile_description}>
            Actualiza y edita tus datos personales, para un envio de productos
            exitoso.
          </p>
          <div className={styles.profile_info_option}>
            <button
              className={`${styles.btn_Completado} ${
                selectedButton === "personal"
                  ? styles.btnSelect
                  : styles.btnNoselect
              } ${styles.btn_profile_info}`}
              onClick={() => setSelectedButton("personal")}
            >
              Datos personales
            </button>
            <button
              className={`${styles.btn_Completado} ${
                selectedButton === "actualizacion"
                  ? styles.btnSelect
                  : styles.btnNoselect
              } ${styles.btn_profile_info}`}
              onClick={() => {
                setSelectedButton("actualizacion");
              }}
            >
              Actualizar Datos
            </button>
          </div>
        </div>
        <form
          className={styles.profile_info_container}
          onSubmit={(e) => e.preventDefault()}
        >
          <p className={styles.profile_info_tittle}>Datos Personales</p>
          <div className={styles.detail_info}>
            <div className={styles.group_info}>
              <div className={styles.profile_info}>
                <p className={styles.label_info}>Nombre Completo</p>
                <input
                  type="text"
                  disabled={selectedButton === "personal"}
                  value={userData.fullname || ""}
                  className={styles.input_info}
                  placeholder={
                    selectedButton === "personal"
                      ? userData.fullname || ""
                      : "Jhon Doe"
                  }
                  onChange={(e) =>
                    setUserData({ ...userData, fullname: e.target.value })
                  }
                />
              </div>

              <div className={styles.profile_info}>
                <p className={styles.label_info}>Correo electrónico</p>
                <input
                  type="text"
                  disabled={selectedButton === "personal"}
                  value={userData.email || ""}
                  className={styles.input_info}
                  placeholder="example@example.com"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.group_info}>
              <div className={styles.profile_info}>
                <p className={styles.label_info}>Teléfono</p>
                <input
                  type="text"
                  disabled={selectedButton === "personal"}
                  value={userData.phone || ""}
                  className={styles.input_info}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  placeholder="123456789"
                />
              </div>

              {selectedButton === "personal" ? (
                <div className={styles.profile_info}>
                  <p className={styles.label_info}>DNI</p>
                  <input
                    type="text"
                    readOnly
                    disabled={true}
                    value={userData.dni_ruc || ""}
                    className={styles.input_info}
                  />
                </div>
              ) : (
                <div className={styles.profile_info}>
                  <p className={styles.label_info}>Contraseña</p>
                  <input
                    type="password"
                    disabled={false}
                    value={userData.password || ""} // Usar el valor almacenado en el estado
                    className={styles.input_info}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    placeholder="****************"
                  />
                </div>
              )}
            </div>
          </div>
          <button
            className={styles.logout_btn}
            type="submit"
            onClick={
              selectedButton === "personal"
                ? handleLogout
                : handleSaveUpdateUser
            }
          >
            <BiLogOut />
            <p className={styles.logout_text}>
              {selectedButton === "personal"
                ? "Cerrar sesión"
                : "Actualizar Perfil"}
            </p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
