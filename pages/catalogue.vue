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
                    <v-img :src="product.image" width="220px">
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
                      <v-btn
                        v-if="logged"
                        icon
                        outline
                        color="accent"
                        @click="addProductToCart(product)"
                      >
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
        <v-btn v-if="logged" dark color="info" @click.stop="drawer = !drawer">
          <v-avatar v-if="quantity > 0" size="25px" color="warning">
            <span class="white--text">{{ quantity }}</span>
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
              <v-list-tile-title v-html="item.product.name"></v-list-tile-title>
              <v-list-tile-title v-html="item.quantity"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon>
                <v-icon color="error" @click="cleanCart(item.id, item.product.id)">clear</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <br />
          <v-divider light></v-divider>
          <v-list-tile>
            <v-btn class="success" @click="generateOrder()">
              <v-icon>shop</v-icon>Comprar
            </v-btn>
            <v-btn class="error" @click="cleanAllCart()">
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
          <v-chip color="info" label outline dark>
            <v-avatar>
              <v-icon>local_atm</v-icon>
            </v-avatar>
            <strong>Precio: ${{selected.price}}</strong>
          </v-chip>
          <v-spacer></v-spacer>
          <v-btn v-if="logged" color="accent" @click="addProductToCart(selected)">
            Añadir al carrito
            <v-icon>add_shopping_cart</v-icon>
          </v-btn>
          <v-btn v-if="!logged" color="error" to="/login">
            <v-icon left>person_add_disabled</v-icon>
            Iniciar sesión
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import config from "@/assets/js/config";
import graphQL from "@/assets/js/graphQL";
const axios = require("axios");

export default {
  layout: "default",
  components: {},
  mounted() {
    this.getUser();
    this.getData();
  },
  data() {
    return {
      logged: false,
      dialog: false,
      loading: null,
      drawer: null,
      items: [
        { title: "Nombre", icon: "keyboard" },
        { title: "Precio", icon: "attach_money" }
      ],
      cart: [],
      quantity: 0,
      cartId: -1,
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
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: graphQL.queries.catalogue
        }
      })
        .then(result => result.data.data)
        .then(result => {
          this.loading = false;
          this.products = result.products;
          if (result.userCart) {
            this.cartId = result.userCart.id;
            this.cart = result.userCart.cartItems;
            this.quantity = result.userCart.cartItems.reduce(
              (a, b) => a + b.quantity,
              0
            );
          }
        });
    },
    showProduct(product) {
      this.selected = product;
      this.dialog = true;
    },
    addProductToCart(product) {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              addProductToCart(productId: ${product.id}) {
                id
                cart_id
                quantity
                product {
                  id
                  name
                }
              }
            }
          `
        }
      })
        .then(response => response.data.data.addProductToCart)
        .then(_product => {
          const productIndex = this.cart.findIndex(
            element => element.product.id === product.id
          );
          if (this.cart[productIndex]) {
            this.cart[productIndex] = _product;
          } else {
            this.cart.push(_product);
          }
          this.quantity = this.cart.reduce((a, b) => a + b.quantity, 0);
          this.cartId = _product.cart_id;
        });
    },
    cleanCart(cartId, productId) {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              deleteOneProductFromCart(cartItemId: ${cartId}, productId: ${productId}) {
                id
                cart_id
                quantity
                product {
                  id
                  name
                }
              }
            }
          `
        }
      })
        .then(response => response.data.data.deleteOneProductFromCart)
        .then(item => {
          const productIndex = this.cart.findIndex(
            element => element.product.id === productId
          );
          if (!this.cart[productIndex]) return;
          this.cart[productIndex] = item;
          this.cartId = item.cart_id;
          this.quantity = this.cart.reduce((a, b) => a + b.quantity, 0);
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    cleanAllCart() {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              deleteCart(cartId: ${this.cartId}) {
                id
              }
            }
          `
        }
      })
        .then(response => {
          this.cart = [];
          this.cartId = -1;
          this.quantity = 0;
        })
        .catch(error => {
          console.log(error);
        });
    },
    generateOrder() {
      const order = { address: "Cra 20#33-47", phone: "3176634256" };
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation generateOrder($order: OrderInput!) {
              createOrder(order: $order) {
                message
              }
            }
          `,
          variables: {
            order
          }
        }
      }).then(response => {
        this.quantity = 0;
        this.cartId = -1;
        this.cart = [];
        alert("Carrito creado");
      });
    },
    getUser() {
      var username = config.cookie.username;
      this.user = this.$cookie.get(username);
      if (this.user) {
        this.logged = true;
      } else {
        this.cleanAllCart();
      }
    }
  }
};
</script>
