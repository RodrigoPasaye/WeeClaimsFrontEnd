<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="50%">
        <v-card>
          <v-card-title class="headline text-green">
            {{ titulo }}
          </v-card-title>

          <v-card-text>
            <p class="text-center">{{ registro.Company }}</p>
            <p class="text-center">{{ registro.ContactName }}</p>
            <p class="text-center">{{ registro.Email }}</p>
            <p class="text-center">{{ registro.PhoneNumber }}</p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" variant="outlined" @click="aceptar(true)">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    registro: Object,
    abrir: Boolean,
  },
  data: () => ({
    titulo: "Datos guardados correctamente",
    dialog: false,
  }),
  watch: {
    abrir(newValue) {
      this.dialog = newValue;
    },
  },
  methods: {
    aceptar() {
      this.$emit("aceptar");
    },
  },
  mounted() {
    this.dialog = this.abrir;
  },
};
</script>
