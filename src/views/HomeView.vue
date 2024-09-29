<template>
  <div class="container">
    <div class="logo-container">
      <div class="logo">
        <img width="90%" :src="logo" alt="Logo" />
      </div>
    </div>

    <div class="login-form">
      <div class="form-container">
        <h1 class="text-primary">Registro Persona</h1>

        <v-form
          v-model="form.valid"
          ref="formRegistro"
          @submit.prevent="confirmacionRegistro()"
          class="mt-16"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.compania"
                required
                :rules="rules.compania"
                maxlength="100"
                :counter="100"
                label="Nombre de la compañía"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.nombreContacto"
                required
                :rules="rules.contacto"
                maxlength="100"
                :counter="100"
                label="Nombre de la persona para contacto"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                required
                :rules="rules.email"
                maxlength="100"
                :counter="100"
                label="Correo electrónico"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="pb-9">
              <v-text-field
                v-model="form.telefono"
                required
                :rules="rules.telefono"
                maxlength="10"
                :counter="10"
                label="Teléfono"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="checkbox-group">
            <input
              type="checkbox"
              id="agree"
              v-model="form.terminosCondiciones"
              required
            />
            <label>
              He leído y acepto el
              <a href="https://vuetifyjs.com" target="_blank">
                Aviso de privacidad/Términos y condiciones
              </a>
            </label>
          </div>

          <v-row justify="center">
            <v-col cols="5" class="pt-9">
              <v-btn
                :disabled="!formularioValido"
                :loading="loading"
                block
                type="submit"
                color="primary"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </div>
  </div>

  <Confirmar
    v-if="confirmDialog.show"
    :abrir="confirmDialog.show"
    :titulo="confirmDialog.titulo"
    :cuerpo="confirmDialog.mensaje"
    @decidir="onCloseConfirmDialog($event)"
  />

  <AceptarModal
    :abrir="aceptarModal.show"
    :registro="requestRegistro"
    @aceptar="cerrarModal()"
  />

  <Alerta
    :show="alerta.ver"
    :tipoAlerta="alerta.tipoAlerta"
    :mensaje="alerta.mensaje"
    @ocultar="alerta.ver = !alerta.ver"
  />
</template>

<script>
import AceptarModal from "@/components/AceptarModal.vue";
import Confirmar from "@/components/Confirmar.vue";
import Alerta from "@/components/Alerta.vue";
import ServiciosCompanias from "@/services/Companies.js";

export default {
  name: "Home",
  components: {
    AceptarModal,
    Confirmar,
    Alerta,
  },
  data: () => ({
    form: {
      valid: false,
      compania: "",
      nombreContacto: "",
      email: "",
      telefono: "",
      terminosCondiciones: false,
    },
    logo: new URL(`@/assets/Logo.jpg`, import.meta.url).href,
    loading: false,
    confirmDialog: {
      show: false,
      titulo: "",
      mensaje: "",
    },
    aceptarModal: {
      show: false,
      titulo: "",
      mensaje: "",
    },
    alerta: {
      mensaje: "",
      ver: false,
      tipoAlerta: "",
    },
    rules: {
      compania: [
        (v) => !!v || "Campo requerido",
        (v) => (v && v.length >= 2) || "Debe tener al menos 2 caracteres",
        (v) => {
          if (/^[A-Za-z\s!¡?¿()&\-.,;:'"@#$%&*|_=]+$/.test(v)) return true;
          return "No debe contener números";
        },
      ],
      contacto: [
        (v) => !!v || "Campo requerido",
        (v) => (v && v.length >= 2) || "Debe tener al menos 2 caracteres",
        (v) => {
          if (/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(v)) return true;
          return "Debe tener solo letras";
        },
      ],
      email: [
        (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Escriba un correo electrónico válido";
        },
      ],
      telefono: [
        (v) => {
          if (/^[0-9-]{10,}$/.test(v)) return true;
          return "Debe tener 10 dígitos";
        },
      ],
      terminos: [(v) => !!v || "Debe aceptar para continuar"],
    },
  }),
  computed: {
    formularioValido() {
      return this.form.valid === true && this.form.terminosCondiciones === true;
    },
    requestRegistro() {
      return {
        Company: this.form.compania,
        ContactName: this.form.nombreContacto,
        Email: this.form.email,
        PhoneNumber: this.form.telefono,
      };
    },
  },
  methods: {
    registrar() {
      if (!this.form.valid) return;

      this.loading = true;

      ServiciosCompanias.registroCompania(this.requestRegistro)
        .then(() => {
          this.mostrarModal();
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 400) {
            const message = error.response
              ? error.response.data[0]
              : error.response.data[0].errorMessage;
            console.log(message);
            this.enviarAlerta("error", message);
          } else if (error.response) {
            this.enviarAlerta("error", "Error interno del servidor");
          } else {
            this.enviarAlerta("error", "Error  de conexión");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    mostrarModal() {
      this.aceptarModal.show = true;
    },
    cerrarModal() {
      this.aceptarModal.show = false;
      this.$router.push({ name: "companias" });
    },
    confirmacionRegistro() {
      this.confirmDialog.titulo = "Registro Persona";
      this.confirmDialog.mensaje = "¿Desea continuar con el registro?";
      this.confirmDialog.show = true;
    },
    onCloseConfirmDialog(response) {
      this.confirmDialog.show = false;
      if (response) {
        this.registrar();
      }
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

.login-form {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.form-container {
  width: 100%;
  max-width: 480px;
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

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 0.5rem;
}

.checkbox-group label {
  font-weight: normal;
  font-size: 0.875rem;
}

.logo {
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .login-form {
    order: 2;
  }

  .logo-container {
    order: 1;
  }
}
</style>
