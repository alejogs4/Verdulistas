<template>
  <div class="container">
    <v-container fluid fill-height class="responsive">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <center>
            <v-icon large color="error">sentiment_very_dissatisfied</v-icon>
            <h1 v-if="error.statusCode ===404">
              <strong>Página no encontrada</strong>
            </h1>
            <h1 v-else>
              <strong>Ha ocurrido un error</strong>
            </h1>
            <br />
            <nuxt-link to="/">
              <h1>Volver a inicio</h1>
            </nuxt-link>
            <v-card color="error">
              <v-img src="https://i.imgur.com/VlBmu6I.png" block></v-img>
            </v-card>
          </center>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "default",
  props: ["error"]
};
</script>

