import TrefisaAPI from "../api/TrefisaAPI";

const useFetch = () => {
  //OBTENER PERFIL
  const getProfile = async (token: string, clientId: string) => {
    try {
      const response = await TrefisaAPI.get(`auth/profile/${clientId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos del usuario");
    }
  };

  //LISTAR ORDENES POR USUARIO
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

  //VER DETALLE DE PRODUCTO - listo
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

  //LISTAR CATEGORIAS - Listo
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

  //PRODUCTOS POR CATEGORIA - LISTO
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
  };
};

export default useFetch;
