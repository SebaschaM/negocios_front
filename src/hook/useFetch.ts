import TrefisaAPI from "../api/TrefisaAPI";

interface userData {
  id?: number;
  fullname?: string;
  email?: string;
  phone?: string;
  dni?: string;
  password?: string;
}

const useFetch = () => {
  //USEPROFILE
  const getProfile = async (clientId: string) => {
    try {
      const response = await TrefisaAPI.get(`auth/profile/${clientId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos del usuario");
    }
  };

  //USEPROFILE
  const updateProfile = async (clientId: string, userData: userData) => {
    try {
      const response = await TrefisaAPI.put(
        `auth/updateprofile/${clientId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar los datos del usuario");
    }
  };

  //USEORDERS
  const getOrderList = async (clientId: string) => {
    try {
      const response = await TrefisaAPI.get(`order/${clientId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el Order por usuario");
    }
  };

  //USRORDERS
  const getDetailProduct = async (productId: string) => {
    try {
      const response = await TrefisaAPI.get(`product/find/${productId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el detalle del producto");
    }
  };

  //USEPRODUCT
  const getCategoryList = async () => {
    try {
      const response = await TrefisaAPI.get("product/findAll/category", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener la lista de categorias");
    }
  };

  //USEPRODUCT
  const getProductsByCategory = async (categoryId: number) => {
    try {
      const response = await TrefisaAPI.get(
        `product/find/category/${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener la lista de productos por categoria");
    }
  };

  //USEPRODUCT
  const getListProducts = async () => {
    try {
      const response = await TrefisaAPI.get(`product`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener la lista de productos");
    }
  };

  return {
    getProfile,
    getOrderList,
    getDetailProduct,
    getCategoryList,
    getProductsByCategory,
    getListProducts,
    updateProfile,
  };
};

export default useFetch;
