import TrefisaAPI from "../api/TrefisaAPI";

const useAuth = () => {
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await TrefisaAPI.post(
        "auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    fullname: string,
    phone: string,
    dni: string
  ) => {
    try {
      const response = await TrefisaAPI.post(
        "auth/register",
        {
          fullname,
          dni,
          email,
          password,
          phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al registrar usuario");
    }
  };

  return { loginUser, registerUser };
};

export default useAuth;
