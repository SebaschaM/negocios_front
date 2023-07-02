import { Header } from "../../components";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Profile.module.css";

function Profile() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState<
    "personal" | "actualizacion"
  >("personal");
  const [, setLogout] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setLogout(true);
  };

  const getUserData = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
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
              onClick={() => setSelectedButton("actualizacion")}
            >
              Actualizar Datos
            </button>
          </div>
        </div>
        <div className={styles.profile_info_container}>
          <p className={styles.profile_info_tittle}>Datos Personales</p>
          {}
          <div className={styles.detail_info}>
            <div className={styles.group_info}>
              <div className={styles.profile_info}>
                <p className={styles.label_info}>Nombre Completo</p>
                <input
                  type="text"
                  readOnly
                  value={userData?.fullname}
                  className={styles.input_info}
                  placeholder="Jhon Doe"
                />
              </div>

              <div className={styles.profile_info}>
                <p className={styles.label_info}>Correo electrónico</p>
                <input
                  type="text"
                  readOnly
                  value={userData?.email}
                  className={styles.input_info}
                  placeholder="example@example.com"
                />
              </div>
            </div>
            <div className={styles.group_info}>
              <div className={styles.profile_info}>
                <p className={styles.label_info}>Teléfono</p>
                <input
                  type="text"
                  readOnly
                  value={userData?.phone}
                  className={styles.input_info}
                  placeholder="123456789"
                />
              </div>
              {/*}
              <div className={styles.profile_info}>
                <p className={styles.label_info}>Contraseña</p>
                <input
                  type="text"
                  readOnly
                  value={userData?.password}
                  className={styles.input_info}
                  placeholder="****************"
                />
              </div>
            {*/}
              <div className={styles.profile_info}>
                <p className={styles.label_info}>DNI</p>
                <input
                  type="text"
                  readOnly
                  value={userData?.dni}
                  className={styles.input_info}
                />
              </div>
            </div>
          </div>
          <button className={styles.logout_btn}>
            <BiLogOut />
            <p className={styles.logout_text} onClick={handleLogout}>
              Cerrar sesión
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
