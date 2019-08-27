<template>
  <v-flex>
    <v-layout>
      <!-- Filtros -->
      <v-navigation-drawer permanent>
        <v-toolbar flat>
          <v-list class="secondary">
            <v-list-tile>
              <v-list-tile-title class="title">
                <strong>
                  [
                  <v-icon color="warning">build</v-icon>WIP]
                  <v-icon>policy</v-icon>Filtros
                </strong>
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
          <v-divider></v-divider>
          <div class="secondary">
            <v-btn @click="limpiarFiltros()" small outline>
              <v-icon>restore</v-icon>Limpiar filtros
            </v-btn>
          </div>
        </v-list>
      </v-navigation-drawer>

      <!-- Catálogo -->
      <v-flex xs12>
        <v-card>
          <v-card-title class="primary">
            <v-icon left large>widgets</v-icon>
            <h1>
              <strong>CATÁLOGO</strong>
            </h1>
          </v-card-title>
          <v-card-text class="secondary">
            <v-progress-linear color="info" indeterminate v-if="loading"></v-progress-linear>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex v-for="product in products" :key="product.id">
                  <v-card>
                    <v-img :src="product.image" contain>
                      <v-chip dark class="warning" @click="showProduct(product)">
                        <strong>{{product.name}}</strong>
                      </v-chip>
                    </v-img>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <p>Precio: ${{product.price}}</p>
                      <v-spacer></v-spacer>
                      <v-btn icon outline @click="showProduct(product)">
                        <v-icon>zoom_in</v-icon>
                      </v-btn>
                      <v-btn icon outline color="accent" @click="addProductToCart(product)">
                        <v-icon>add_shopping_cart</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>

        <!-- Botón carrito -->
      </v-flex>
      <v-flex xs1>
        <v-btn dark color="info" @click.stop="drawer = !drawer">
          <v-avatar size="25px" color="warning">
            <span class="white--text">{{ cart.length }}</span>
          </v-avatar>
          <v-icon dark>shopping_cart</v-icon>Ver carrito
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- CARRITO -->
    <v-layout wrap style="height: 200px;">
      <v-navigation-drawer v-model="drawer" absolute right temporary>
        <v-list class="pa-1">
          <v-list-tile avatar tag="div" class="warning">
            <v-icon left>shopping_cart</v-icon>

            <v-list-tile-content>
              <v-list-tile-title>Carrito de compras</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="drawer = !drawer">
                <v-icon color="warning">exit_to_app</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-container>
          <v-alert :value="cart.length == 0" color="grey">
            <v-icon dark left>error</v-icon>El carrito está vacío.
          </v-alert>
        </v-container>
        <v-list>
          <v-list-tile v-for="item in cart" :key="item.id">
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon>
                <v-icon color="error" @click="cleanCart(item.id)">clear</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <br />
          <v-divider light></v-divider>
          <v-list-tile>
            <v-btn class="success">
              <v-icon>shop</v-icon>Comprar
            </v-btn>
            <v-btn class="error" @click="cleanCart()">
              Cancelar
              <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <!-- DIALOGO -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-img :src="selected.image" contain>
          <v-chip outline label dark>
            <v-avatar>
              <v-icon>label</v-icon>
            </v-avatar>
            <strong>{{selected.code}}</strong>
          </v-chip>
        </v-img>
        <br />
        <v-card-title class="warning">
          <h1>{{selected.name}}</h1>
        </v-card-title>
        <v-card-text>{{selected.description}}</v-card-text>
        <v-card-actions>
          <v-chip color="primary" label outline dark>
            <v-avatar>
              <v-icon>local_atm</v-icon>
            </v-avatar>
            <strong>Precio: ${{selected.price}}</strong>
          </v-chip>
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="addProductToCart(selected)">
            Añadir al carrito
            <v-icon>add_shopping_cart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import config from "@/assets/js/config";
const axios = require("axios");

export default {
  layout: "default",
  components: {},
  mounted() {
    this.getData();
  },
  data() {
    return {
      dialog: false,
      loading: null,
      drawer: null,
      items: [
        { title: "Nombre", icon: "keyboard" },
        { title: "Precio", icon: "attach_money" }
      ],
      cart: [],
      products: [],
      selected: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    limpiarFiltros() {},
    getData() {
      this.loading = true;
      axios({
        url: config.api.url,
        method: "POST",
        data: {
          query: `
            {
              products {
                id,
                code,
                name,
                description,
                price,
                image,
                quantity
              }
            }
          `
        }
      }).then(result => {
        this.loading = false;
        this.products = result.data.data.products;
      });
    },
    showProduct(product) {
      this.selected = product;
      this.dialog = true;
    },
    addProductToCart(product) {
      this.cart.push(product);
    },
    cleanCart(id) {
      let newCart = this.cart;
      if (id) {
        for (let index = 0; index < this.cart.length; index++) {
          if (id == this.cart[index].id) {
            newCart.splice(index, 1);
          }
        }
        this.cart = newCart;
      } else {
        this.cart = [];
      }
    }
  }
};
</script>