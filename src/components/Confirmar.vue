<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline text-primary">
            {{ titulo }}
          </v-card-title>

          <v-card-text>{{ cuerpo }}</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn class="text-red" @click="decidir(false)"> Cancelar </v-btn>

            <v-spacer></v-spacer>

            <v-btn class="text-green" @click="decidir(true)"> Continuar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    titulo: String,
    cuerpo: String,
    abrir: Boolean,
  },
  data: () => ({
    dialog: false,
  }),
  watch: {
    abrir(newValue) {
      this.dialog = newValue;
    },
  },
  methods: {
    decidir(valor) {
      this.$emit("decidir", valor);
    },
  },
  mounted() {
    this.dialog = this.abrir;
  },
};
</script>
