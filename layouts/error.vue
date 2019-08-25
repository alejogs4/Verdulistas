<template>
  <div class="container">
    <v-container fluid fill-height class="responsive">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div>
          </div>
          <h1 v-if="error.statusCode ===404"><strong>Página no encontrada</strong></h1>
          <h1 v-else><strong>Ha ocurrido un error</strong></h1>
          <br>
          <nuxt-link to="/home">Página Principal</nuxt-link>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ['error']
}
</script>

