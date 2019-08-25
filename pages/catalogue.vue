<template>
  <v-container>
    <v-layout>
      <!-- Filtros -->
      <v-flex xs2>
        <v-navigation-drawer permanent>
          <v-toolbar flat>
            <v-list class="primary">
              <v-list-tile>
                <v-list-tile-title class="title">
                  Filtros
                  <v-icon>search</v-icon>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list dense class="pt-0">
            <v-list-tile v-for="item in items" :key="item.title">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-btn @click="limpiarFiltros()" small outline>
            <v-icon>restore</v-icon>Limpiar filtros
          </v-btn>
        </v-navigation-drawer>
      </v-flex>

      <!-- Catálogo -->
      <v-flex>
        <v-card>
          <v-card-title>
            <v-icon color="warning" left large>build</v-icon>
            <h1>
              <strong>[WIP]</strong>
            </h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <h1>
              <strong>Catálogo</strong>
              <v-icon color="success" large right>add_shopping_cart</v-icon>
            </h1>Página de catálogo de productos.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1>
        <v-btn dark large color="primary" @click.stop="drawer = !drawer">
          <v-icon dark>shopping_cart</v-icon>Ver carrito
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- CARRITO -->
    <v-layout wrap style="height: 200px;">
      <v-navigation-drawer v-model="drawer" absolute dark right temporary>
        <v-list class="pa-1">
          <v-list-tile avatar tag="div" class="info">
            <v-icon dark left>shopping_cart</v-icon>

            <v-list-tile-content>
              <v-list-tile-title>Carrito de compras</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>clear</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider light></v-divider>
          <v-list-tile>
            <v-btn class="success">
              <v-icon>shop</v-icon>Comprar
            </v-btn>
            <v-btn class="error">
              Cancelar
              <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "default",
  components: {},
  beforeMount() {},
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      cart: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    limpiarFiltros() {}
  }
};
</script>