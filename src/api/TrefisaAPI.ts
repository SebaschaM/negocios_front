// Create connection axios pro
import axios from "axios";

const TrefisaAPI = axios.create({
  baseURL: "https://negocios-back.onrender.com/api/",
});

export default TrefisaAPI;
