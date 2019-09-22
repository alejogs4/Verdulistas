<template>
  <v-app class="secondary">
    <v-container>
      <nuxt />
    </v-container>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>Verdulistas &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>
