import axios from "axios";

const useFetch = () => {
  //OBTENER PERFIL
  const getProfile = async (token: string, clientId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/auth/profile/${clientId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos del usuario");
    }
  };

  //LISTAR ORDENES POR USUARIO
  const getOrderList = async (clientId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/order/${clientId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el Order por usuario");
    }
  };

  //VER DETALLE DE PRODUCTO - listo
  const getDetailProduct = async (productId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/find/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el detalle del producto");
    }
  };

  //LISTAR CATEGORIAS - Listo
  const getCategoryList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/findAll/category",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error al obtener la lista de categorias");
    }
  };

  //PRODUCTOS POR CATEGORIA - LISTO
  const getProductsByCategory = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/find/category/${categoryId}`,
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
      const response = await axios.get(`http://localhost:3000/api/product`, {
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
