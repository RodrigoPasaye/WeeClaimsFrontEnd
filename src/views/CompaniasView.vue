<template>
  <div class="container">
    <div class="logo-container">
      <div class="logo">
        <img width="90%" :src="logo" alt="Logo" />
      </div>
    </div>

    <div class="table">
      <div class="table-container">
        <h1 class="text-primary pb-10">Registros</h1>

        <v-row class="pb-16" justify="center">
          <v-col>
            <v-table>
              <thead>
                <tr>
                  <th><strong>Compañía</strong></th>
                  <th><strong>Contacto</strong></th>
                  <th><strong>Correo</strong></th>
                  <th><strong>Teléfono</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!hayregistros">
                  No hay datos
                </tr>
                <tr v-else v-for="item in companies" :key="item.company">
                  <td>
                    <strong>{{ item.company }}</strong>
                  </td>
                  <td>{{ item.contactName }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.phoneNumber }}</td>
                </tr>
              </tbody>
            </v-table>

            <v-row class="pt-16" justify="center">
              <v-col cols="5">
                <v-btn block color="primary" @click="regresar()">
                  Regresar
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>

  <Alerta
    :show="alerta.ver"
    :tipoAlerta="alerta.tipoAlerta"
    :mensaje="alerta.mensaje"
    @ocultar="alerta.ver = !alerta.ver"
  />
</template>

<script>
import ServiciosCompanias from "@/services/Companies.js";
import Alerta from "@/components/Alerta.vue";

export default {
  name: "Registros",
  components: {
    Alerta,
  },
  data: () => ({
    logo: new URL(`@/assets/Logo.jpg`, import.meta.url).href,
    companies: [],
    alerta: {
      mensaje: "",
      ver: false,
      tipoAlerta: "",
    },
  }),
  mounted() {
    this.obtenerCompanias();
  },
  computed: {
    hayregistros() {
      return this.companies.length !== 0;
    },
  },
  methods: {
    regresar() {
      this.$router.push({ name: "home" });
    },
    obtenerCompanias() {
      ServiciosCompanias.obtenerCompanias()
        .then(({ data }) => {
          this.companies = data;
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            this.enviarAlerta("error", "Error interno del servidor");
          } else {
            this.enviarAlerta("error", "Error  de conexión");
          }
        });
    },
    enviarAlerta(tipoAlerta, mensaje) {
      this.alerta.tipoAlerta = tipoAlerta;
      this.alerta.mensaje = mensaje;
      this.alerta.ver = true;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex: 1;
}

.table {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.table-container {
  width: 100%;
  max-width: 590px;
}

.logo-container {
  flex: 1;
  background-color: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  text-align: left;
}

.logo {
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .table {
    order: 2;
  }

  .logo-container {
    order: 1;
  }
}
</style>
