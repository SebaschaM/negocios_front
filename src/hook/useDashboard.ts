//http:localhost:3000/api/dashboard/grap4

import TrefisaAPI from "../api/TrefisaAPI";

const useDashboard = () => {
  const getDataGraph1 = async () => {
    try {
      const response = await TrefisaAPI.get(`dashboard/grap1`);
      return response.data;
    } catch (error) {
      throw new Error("Error");
    }
  };

  const getDataGraph2 = async () => {
    try {
      const response = await TrefisaAPI.get(`dashboard/grap2`);
      return response.data;
    } catch (error) {
      throw new Error("Error");
    }
  };

  const getDataGraph3 = async () => {
    try {
      const response = await TrefisaAPI.get(`dashboard/grap3`);
      return response.data;
    } catch (error) {
      throw new Error("Error");
    }
  };

  const getDataGraph4 = async () => {
    try {
      const response = await TrefisaAPI.get(`dashboard/grap4`);
      return response.data;
    } catch (error) {
      throw new Error("Error");
    }
  };

  return { getDataGraph1, getDataGraph2, getDataGraph3, getDataGraph4 };
};

export default useDashboard;
