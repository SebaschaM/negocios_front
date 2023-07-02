import { Header } from "../../components";
import { useState } from "react";
import styles from "../../styles/Profile.module.css";

function Profile() {
  const [selectedButton, setSelectedButton] = useState<
    "personal" | "actualizacion"
  >("personal");
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
        <div className={styles.profile_info}>
          <p className={styles.tittle_info}>Datos Personales</p>
          <div className={styles.detail_info}>
            <div className={styles.group_info}>
              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Nombre Completo</p>
                <input type="text" placeholder="Jhon Doe" />
              </div>

              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Correo electrónico</p>
                <input type="text" placeholder="example@example.com" />
              </div>
            </div>
            <div className={styles.group_info}>
              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Teléfono</p>
                <input type="text" placeholder="123456789" />
              </div>

              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Contraseña</p>
                <input type="text" placeholder="****************" />
              </div>
            </div>
          </div>
          <button className={styles.btn_add}>
            <p>Actualizar Datos</p>
          </button>
        </div>
        <div className={styles.profile_info}>
          <p className={styles.tittle_info}>Datos Personales</p>
          <div className={styles.detail_info}>
            <div className={styles.group_info}>
              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Nombre Completo</p>
                <input type="text" placeholder="Jhon Doe" />
              </div>

              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Correo electrónico</p>
                <input type="text" placeholder="example@example.com" />
              </div>
            </div>
            <div className={styles.group_info}>
              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Teléfono</p>
                <input type="text" placeholder="123456789" />
              </div>

              <div className={styles.fullname_info}>
                <p className={styles.label_info}>Contraseña</p>
                <input type="text" placeholder="****************" />
              </div>
            </div>
          </div>
          <button className={styles.btn_add}>
            <p>Actualizar Datos</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
