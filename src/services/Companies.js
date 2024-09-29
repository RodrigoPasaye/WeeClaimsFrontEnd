import { cliente } from "./clientApi";

export default {
  registroCompania(request) {
    return cliente.post("/Customer/Register", request);
  },
  obtenerCompanias() {
    return cliente.get("/Customer");
  },
};
