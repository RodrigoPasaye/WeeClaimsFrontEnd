import axios from "axios";

var cliente = axios.create({
  baseURL: import.meta.env.VITE_MAIN_SERVICE,
  headers: {
    "Content-Type": "application/json",
  },
});

export { cliente };
