<template>
  <v-snackbar v-model="visualizar" :timeout="timeout" :color="tipoAlerta">
    {{ mensaje }}
  </v-snackbar>
</template>

<script>
export default {
  name: "Alerta",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    tipoAlerta: {
      type: String,
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    visualizar: false,
    timeout: 9000,
  }),
  watch: {
    show() {
      if (this.show) {
        this.visualizar = this.show;
        setTimeout(() => {
          this.cerrar();
        }, this.timeout);
      }
    },
  },
  methods: {
    cerrar() {
      this.visualizar = false;
      this.$emit("ocultar");
    },
  },
};
</script>
