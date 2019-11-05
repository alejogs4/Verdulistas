<template>
  <div>
    <!-- CATÁLOGO Y BARRAS -->
    <v-flex xs12>
      <v-toolbar class="auto" sticky color="primary">
        <v-btn color="warning" @click.stop="drawer2 = !drawer2" class="hidden-md-and-up">
          <v-icon dark>youtube_searched_for</v-icon>Filtros
        </v-btn>
        <v-layout class="hidden-sm-and-down">
          <v-btn class="hidden-sm-and-down" icon color="white" @click="limpiarFiltros()">
            <v-icon>restore</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            solo
            v-model="nombreFiltro"
            prepend-inner-icon="keyboard"
            type="text"
            label="Buscar por nombre"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            solo
            v-model="precioFiltro"
            prepend-inner-icon="attach_money"
            type="number"
            :min="0"
            :step="500"
            label="Precio máximo"
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-layout>

        <v-spacer></v-spacer>
        <v-btn v-if="logged" dark color="info" @click.stop="drawer = !drawer">
          <v-avatar v-if="quantity > 0" size="25px" color="warning">
            <span class="white--text">{{ quantity }}</span>
          </v-avatar>
          <v-icon dark>shopping_cart</v-icon>Ver carrito
        </v-btn>
      </v-toolbar>
      <v-tabs centered slider-color="warning" color="info" dark>
        <v-tab v-for="cat in categories" :key="cat.name">
          <v-btn depressed flat block @click="tab = cat.name">
            {{ cat.name }}
            <v-icon>{{ cat.icon }}</v-icon>
          </v-btn>
        </v-tab>
      </v-tabs>
      <v-card>
        <v-card-text class="secondary">
          <v-progress-linear color="info" indeterminate v-if="loading"></v-progress-linear>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex v-for="product in products" :key="product.id">
                <v-card max-width="350">
                  <center>
                    <v-img :src="product.image" height="250" @click="showProduct(product)">
                      <v-chip dark color="black">
                        <h3>{{product.name}}</h3>
                      </v-chip>
                    </v-img>
                  </center>
                  <v-card-actions>
                    <v-chip color="info" label outline dark @click="showProduct(product)">
                      <v-avatar>
                        <v-icon>local_atm</v-icon>
                      </v-avatar>
                      <strong>Precio: ${{product.price}}</strong>
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn outline color="error" v-if="!logged" @click="dialogLogin = true">
                      Comprar
                      <v-icon>add_shopping_cart</v-icon>
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="black--text"
                      v-if="logged"
                      @click="addProductToCart(product)"
                    >
                      Agregar
                      <v-icon>add_shopping_cart</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-toolbar class="hidden-md-and-up">
        <v-spacer></v-spacer>
        <v-btn flat @click="scrollToTop()">
          <v-icon small>arrow_upward</v-icon>
          <i>Subir</i>
          <v-icon small>arrow_upward</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-flex>

    <!-- DESCRIPCION DE PRODUCTO -->
    <v-dialog v-model="dialog" width="500" transition="scale-transition">
      <v-card>
        <v-card-title class="warning">
          <h1>{{selected.name}}</h1>
        </v-card-title>
        <center>
          <v-img :src="selected.image" contain></v-img>
        </center>
        <v-card-text>{{selected.description}}</v-card-text>
        <div>
          <v-chip outline color="black" label dark>
            <v-avatar>
              <v-icon>label</v-icon>
            </v-avatar>
            <strong v-if="selected != {}">{{selected.category.name}}</strong>
          </v-chip>
          <v-spacer></v-spacer>
        </div>
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
          <v-btn v-if="!logged" color="error" @click="dialogLogin = true">
            Comprar producto
            <v-icon>add_shopping_cart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- FILTROS -->
    <v-layout v-if="drawer2" wrap style="height: 200px;">
      <v-navigation-drawer v-model="drawer2" absolute left temporary>
        <v-list class="pa-1">
          <v-list-tile avatar tag="div" class="warning">
            <v-icon left>youtube_searched_for</v-icon>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">Filtros</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="drawer2 = !drawer2">
                <v-icon>exit_to_app</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="nombreFiltro"
              prepend-icon="keyboard"
              type="text"
              label="Buscar por nombre"
            ></v-text-field>
            <v-text-field
              v-model="precioFiltro"
              prepend-icon="attach_money"
              type="number"
              :min="0"
              :step="500"
              label="Precio máximo"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-divider light></v-divider>
        <center>
          <v-btn outline @click="limpiarFiltros()">
            Limpiar filtros
            <v-icon>restore</v-icon>
          </v-btn>
          <v-btn color="warning" outline @click.stop="drawer2 = !drawer2">
            VER
            <v-icon>subject</v-icon>
          </v-btn>
        </center>
      </v-navigation-drawer>
    </v-layout>

    <!-- CARRITO -->
    <v-layout v-if="drawer" wrap style="height: 200px;">
      <v-navigation-drawer v-model="drawer" absolute right temporary>
        <v-list class="pa-1">
          <v-list-tile avatar tag="div" class="primary">
            <v-icon left>shopping_cart</v-icon>

            <v-list-tile-content>
              <v-list-tile-title>Carrito de compras</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>exit_to_app</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-container v-if="cart.length == 0">
          <v-alert :value="cart.length == 0" color="grey">
            <v-icon dark left>error</v-icon>El carrito está vacío.
          </v-alert>
        </v-container>
        <v-list two-line dense class="secondary">
          <template v-for="item in cart">
            <v-list-tile :key="item.product.name" avatar>
              <v-list-tile-avatar>
                <v-btn icon small color="warning">{{ item.quantity }}</v-btn>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.product.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.product.price"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn
                icon
                small
                outline
                :disabled="item.quantity == 1"
                color="error"
                @click="cleanCart(item.id, item.product.id)"
              >
                <v-icon small>exposure_neg_1</v-icon>
              </v-btn>
              <!-- <v-btn icon small outline color="success">
                <v-icon small>exposure_plus_1</v-icon>
              </v-btn>-->
            </v-list-tile>
          </template>
        </v-list>
        <v-divider light></v-divider>
        <center>
          <v-btn color="success" depressed :disabled="quantity == 0" @click="orderPrice()">
            <v-icon>shop</v-icon>Comprar
          </v-btn>
          <v-btn outline @click="cleanAllCart()">
            Vaciar
            <v-icon>remove_shopping_cart</v-icon>
          </v-btn>
        </center>
      </v-navigation-drawer>
    </v-layout>

    <!-- CONFIRMACIÓN DE COMPRA -->
    <v-dialog v-model="dialogCompra" scrollable persistent max-width="550">
      <v-card>
        <v-card-title class="primary">
          <h1>Confirmar Pedido</h1>
        </v-card-title>
        <v-card-text>
          <v-container>
            <center>
              <table
                class="mytable"
                id="table1"
                style="border: 0.3px solid black;
            border-collapse: collapse;
            vertical-align: center;"
              >
                <tr>
                  <td
                    v-for="head in headers"
                    :key="head.value"
                    style="background-color:rgb(235,241,222);border:0.2px solid black; text-align: center; padding: 5px;"
                  >
                    <b>{{head.title}}</b>
                  </td>
                </tr>
                <tr
                  v-for="item in cart"
                  :key="item.id"
                  style="background-color: rgb(200,200,200); color:black; border:0.2px solid black;"
                >
                  <td style="border:0.2px solid black; padding: 5px;">{{ item.product.name }}</td>
                  <td style="border:0.2px solid black; text-align: center;">{{ item.quantity }}</td>
                  <td
                    style="border:0.2px solid black; text-align: right; padding: 5px;"
                  >${{ item.product.price }}</td>
                  <td style="border:0.2px solid black; text-align: right; padding: 5px;">
                    <b>${{ item.quantity*item.product.price }}</b>
                  </td>
                </tr>
                <tr style="height: 20px;"></tr>
                <tr
                  style="background-color: rgb(200,200,200); color:black; border:0.2px solid black; text-align: center; padding: 5px;"
                >
                  <td>
                    <b>Subtotal</b>
                  </td>
                  <td></td>
                  <td></td>
                  <td
                    style="background-color: rgb(235,241,222); color:black; border:0.2px solid black; padding: 5px;"
                  >
                    <b>${{totalPrice}}</b>
                  </td>
                </tr>
                <tr
                  v-if="user.bond > 0"
                  style="background-color: rgb(200,200,200); color:black; border:0.2px solid black; text-align: center; padding: 5px;"
                >
                  <td>
                    <b>Bonificación</b>
                  </td>
                  <td></td>
                  <td></td>
                  <td
                    style="background-color: rgb(235,241,222); color:black; border:0.2px solid black; padding: 5px;"
                  >
                    <b>{{user.bond}}</b>
                  </td>
                </tr>
                <tr style="height: 20px;"></tr>
                <tr
                  style="background-color: rgb(200,200,200); color:black; border:0.2px solid black; text-align: center; padding: 5px;"
                >
                  <td>
                    <b>Total de pedido</b>
                  </td>
                  <td></td>
                  <td></td>
                  <td
                    style="background-color: rgb(235,241,222); color:black; border:0.2px solid black; padding: 5px;"
                  >
                    <b v-if="(totalPrice - user.bond) > 0">${{totalPrice - user.bond}}</b>
                    <b v-else>$0</b>
                  </td>
                </tr>
              </table>
            </center>
          </v-container>
          <v-container class="secondary">
            <h2>Información de pedido</h2>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="address"
                prepend-icon="store"
                type="text"
                :rules="rules"
                label="Dirección de entrega"
                required
              ></v-text-field>
              <v-text-field
                v-model="phone"
                prepend-icon="local_phone"
                type="text"
                mask="phone"
                :rules="phoneRules"
                label="Teléfono celular"
                required
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider light></v-divider>
        <v-card-actions>
          <v-btn class="error" @click="dialogCompra = false">
            Cancelar
            <v-icon>clear</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="success" :disabled="quantity == 0 || !valid" @click="generateOrder()">
            <v-icon>done_all</v-icon>Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- NOTIFICACION -->
    <v-snackbar v-model="snackbar" color="success" :timeout="2000">
      {{snacktext}}
      <v-icon dark>add_shopping_cart</v-icon>
    </v-snackbar>

    <!-- DIALOGO DE INICIAR SESION -->
    <v-dialog v-model="dialogLogin" max-width="300">
      <v-card>
        <v-card-title class="headline primary">
          <center>
            <strong>Quieres comprar en Verdulistas?</strong>
          </center>
        </v-card-title>
        <v-card-text>Para comprar productos de nuestra tienda, debes primero estar registrado y loggeado.</v-card-text>
        <v-card-actions>
          <v-btn color="info" flat to="/register">REGISTRARSE</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info" flat to="/login">INGRESAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
    this.getProducts();
    this.getCategories();
  },
  data() {
    return {
      valid: false,
      order: false,
      orderText: "",
      tab: "Todos",
      logged: false,
      user: {},
      rolUser: "",
      dialog: false,
      dialogCompra: false,
      dialogLogin: false,
      loading: null,
      snackbar: false,
      snacktext: "",
      drawer: null,
      drawer2: null,
      nombreFiltro: "",
      precioFiltro: "",
      headers: [
        { title: "Producto", value: "name" },
        { title: "Cantidad", value: "quantity" },
        { title: "Precio x unidad", value: "price" },
        { title: "Precio", value: "totalPrice" }
      ],
      categories: [],
      rules: [v => !!v || "Campo obligatorio"],
      phoneRules: [
        v => !!v || "Ingrese teléfono",
        v =>
          (v && v.length >= 10) || "Teléfono debe tener al menos 10 caracteres."
      ],
      cart: [],
      quantity: 0,
      cartId: -1,
      products: [],
      allProducts: [],
      selected: {
        category: {
          name: null
        }
      },
      totalPrice: 0,
      address: "",
      phone: ""
    };
  },
  methods: {
    limpiarFiltros() {
      this.products = this.allProducts;
      this.nombreFiltro = "";
      this.precioFiltro = "";
    },
    getProducts() {
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
          this.allProducts = result.products;
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
    getCategories() {
      this.loading = true;
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: graphQL.queries.categories
        }
      })
        .then(result => result.data.data)
        .then(result => {
          this.loading = false;
          this.categories = [];
          this.categories.push({ name: "Todos", icon: "blur_on" });
          result.categories.forEach(element => {
            this.categories.push(element);
          });
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
                  price
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
          this.snackbar = true;
          this.snacktext = "Producto añadido al carrito";
          this.dialog = false;
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
                  price
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
      const order = { address: this.address, phone: this.phone };
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
        this.dialogCompra = false;
        this.snackbar = true;
        this.snacktext = "Pedido generado! Compruebe el correo";
      });
    },
    getUser() {
      var userCookie = config.cookie.user;
      this.user = JSON.parse(this.$cookie.get(userCookie));
      var rol = config.cookie.rol;
      this.rolUser = this.$cookie.get(rol);

      if (this.user) {
        this.logged = true;
      } else {
        this.cleanAllCart();
      }
    },
    orderPrice() {
      (this.address = ""),
        (this.phone = ""),
        (this.valid = false),
        (this.totalPrice = 0);
      this.cart.forEach(element => {
        this.totalPrice += element.product.price * element.quantity;
      });
      this.dialogCompra = true;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  watch: {
    nombreFiltro() {
      if (this.nombreFiltro != "") {
        this.products = this.allProducts.filter(producto =>
          producto.name.toLowerCase().includes(this.nombreFiltro.toLowerCase())
        );
      } else {
        this.products = this.allProducts;
      }
    },
    precioFiltro() {
      if (this.precioFiltro != 0) {
        this.products = this.allProducts.filter(
          producto => producto.price <= this.precioFiltro
        );
      } else {
        this.products = this.allProducts;
      }
    },
    tab() {
      if (this.tab == "Todos") {
        this.products = this.allProducts;
      } else {
        this.products = this.allProducts.filter(
          producto => producto.category.name == this.tab
        );
      }
    }
  }
};
</script>
