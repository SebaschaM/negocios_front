// Create connection axios pro
import axios from "axios";

const TrefisaAPI = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default TrefisaAPI;
