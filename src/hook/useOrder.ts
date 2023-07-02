import TrefisaAPI from "../api/TrefisaAPI";
import { Order } from "../interfaces/Order";

export const useOrder = () => {
  const addOrder = async (body: Order) => {
    try {
      const response = await TrefisaAPI.post(`order`, body);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos del usuario");
    }
  };

  return {
    addOrder,
  };
};
