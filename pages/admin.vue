<template>
  <div>
    <v-tabs v-model="model" centered color="info" dark slider-color="warning">
      <v-tab href="#tab-1">Productos</v-tab>
      <v-tab href="#tab-2">Categorias</v-tab>
      <v-tab href="#tab-3">Pedidos</v-tab>
    </v-tabs>

    <v-tabs-items v-model="model">
      <v-tab-item value="tab-1">
        <!-- TABLA DE PRODUCTOS -->
        <v-flex xs12>
          <v-toolbar flat>
            <v-toolbar-title>
              <h1>Productos</h1>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="newAction('product')" color="primary" class="black--text">Nuevo producto</v-btn>
          </v-toolbar>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field flat v-model="search" append-icon="search" label="Buscar"></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="products"
            :search="search"
            :loading="loading"
            class="elevation-1"
            no-results-text="Tu búsqueda no encontró resultados"
            no-data-text="No hay datos disponibles"
            rows-per-page-text="Productos por página"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.id }}</td>
              <td>{{ props.item.code }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.category.name }}</td>
              <td class="text-xs-right">{{ props.item.price }}</td>
              <td class="text-xs-right">{{ props.item.quantity }}</td>
              <td class="text-xs-left">
                <v-btn small icon outline color="info" @click="editAction(props.item, 'product')">
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  small
                  icon
                  outline
                  color="error"
                  @click="deleteAction(props.item, 'product')"
                >
                  <v-icon small>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-tab-item>

      <v-tab-item value="tab-2">
        <!-- TABLA DE CATEGORIAS -->
        <v-flex xs12>
          <v-toolbar flat>
            <v-toolbar-title>
              <h1>Categorias</h1>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              @click="newAction('category')"
              color="primary"
              class="black--text"
            >Nueva categoria</v-btn>
          </v-toolbar>
          <v-data-table
            :headers="headersCat"
            :items="categories"
            :loading="loading"
            class="elevation-1"
            no-results-text="Tu búsqueda no encontró resultados"
            no-data-text="No hay datos disponibles"
            rows-per-page-text="Categorias por página"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.icon }}</td>
              <td class="text-xs-left">
                <v-btn small icon outline color="info" @click="editAction(props.item, 'category')">
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  disabled
                  small
                  icon
                  outline
                  color="error"
                  @click="deleteAction(props.item, 'category')"
                >
                  <v-icon small>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-tab-item>

      <v-tab-item value="tab-3">
        <!-- TABLA DE PEDIDOS -->
        <v-flex xs12>
          <v-toolbar flat>
            <v-toolbar-title>
              <h1>Pedidos</h1>
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-data-table
            :headers="headersOrder"
            :items="orders"
            :loading="loading"
            class="elevation-1"
            no-results-text="Tu búsqueda no encontró resultados"
            no-data-text="No hay datos disponibles"
            rows-per-page-text="Pedidos por página"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.address }}</td>
              <td>{{ props.item.phone }}</td>
              <td>{{ props.item.order_date }}</td>
              <td>
                <div>
                  {{ props.item.user.name }}
                  {{ props.item.user.lastname }}
                  <br />
                  {{ props.item.user.email }}
                </div>
              </td>
              <!-- <td class="text-xs-left">
                <v-btn small icon outline color="info" @click="editAction(props.item, 'category')">
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  small
                  icon
                  outline
                  color="error"
                  @click="deleteAction(props.item, 'category')"
                >
                  <v-icon small>delete</v-icon>
                </v-btn>
              </td>-->
            </template>
          </v-data-table>
        </v-flex>
      </v-tab-item>
    </v-tabs-items>

    <!-- DIALOGO DE EDICION Y CREACION PRODUCTO -->
    <v-dialog v-model="dialog" persistent scrollable max-width="600px">
      <v-card>
        <v-card-title class="primary">
          <span class="headline">
            <strong>{{accion}}</strong> Producto
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="selectedProduct.code" label="Código" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="selectedProduct.name" label="Nombre" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-textarea v-model="selectedProduct.description" label="Descripción"></v-textarea>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-img
                  :src="selectedProduct.image"
                  :lazy-src="selectedProduct.image"
                  contain
                  height="125"
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="selectedProduct.image" label="URL de imagen" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="selectedProduct.price"
                  label="Precio"
                  prepend-inner-icon="attach_money"
                  type="number"
                  :min="0"
                  :step="100"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="selectedProduct.quantity"
                  label="Cantidad"
                  type="number"
                  :min="0"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="selectedProduct.category.name"
                  :items="categoriesNames"
                  label="Categoría"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" outline @click="cancel()">
            <v-icon>clear</v-icon>Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="accion == 'Editar'" color="success" @click="comprobarCampos()">
            <v-icon>edit</v-icon>Confirmar edición
          </v-btn>
          <v-btn v-if="accion == 'Nuevo'" color="success" @click="comprobarCampos()">
            <v-icon>create_new_folder</v-icon>Crear Producto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOGO DE ELIMINAR PRODUCTO -->
    <v-dialog v-model="dialogDelete" persistent max-width="400">
      <v-card>
        <v-card-title class="error">
          <span class="headline white--text">
            <strong>{{accion}}</strong> Producto
          </span>
        </v-card-title>
        <v-card-text>
          <h3>¿Desea eliminar este producto?</h3>
          <br />
          <v-card>
            <center>
              <v-img :src="selectedProduct.image" contain>
                <v-chip dark class="warning">
                  <strong>{{selectedProduct.name}}</strong>
                </v-chip>
              </v-img>
            </center>
            <v-card-actions>
              <v-chip label outline dark>
                <v-avatar>
                  <v-icon>label</v-icon>
                </v-avatar>
                <strong>{{selectedProduct.code}}</strong>
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip color="info" label outline dark>
                <v-avatar>
                  <v-icon>local_atm</v-icon>
                </v-avatar>
                <strong>Precio: ${{selectedProduct.price}}</strong>
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn outline @click="dialogDelete = false">
            <v-icon>clear</v-icon>Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteProduct(selectedProduct)">
            <v-icon>delete_forever</v-icon>Eliminar Producto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOGO DE CATEGORIA -->
    <v-dialog v-model="dialogCategory" persistent scrollable max-width="600px">
      <v-card>
        <v-card-title class="primary">
          <span class="headline">
            <strong>{{accion}}</strong> Categoria
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="selectedCategory.name" label="Nombre" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="selectedCategory.icon"
                  label="Icono"
                  type="text"
                  required
                  :append-icon="selectedCategory.icon"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" outline @click="cancel()">
            <v-icon>clear</v-icon>Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="accion == 'Editar'" color="success" @click="editCategory()">
            <v-icon>edit</v-icon>Confirmar edición
          </v-btn>
          <v-btn v-if="accion == 'Nueva'" color="success" @click="addCategory()">
            <v-icon>create_new_folder</v-icon>Crear Categoria
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOGO DE ELIMINAR CATEGORIA -->
    <v-dialog v-model="dialogDeleteCategory" persistent max-width="400">
      <v-card>
        <v-card-title class="error">
          <span class="headline white--text">
            <strong>{{accion}}</strong> Categoría
          </span>
        </v-card-title>
        <v-card-text>
          <h3>¿Desea eliminar esta categoría?</h3>
          <br />
          <v-toolbar>
            <v-chip label outline color="black">
              <v-avatar>
                <v-icon>label</v-icon>
              </v-avatar>
              <strong>Nombre: {{selectedCategory.name}}</strong>
            </v-chip>
            <v-spacer></v-spacer>
            <v-chip color="info" label outline dark>
              <v-avatar>
                <v-icon>{{selectedCategory.icon}}</v-icon>
              </v-avatar>
              <strong>Icono: "{{selectedCategory.icon}}"</strong>
            </v-chip>
          </v-toolbar>
        </v-card-text>
        <v-card-actions>
          <v-btn outline @click="dialogDeleteCategory = false">
            <v-icon>clear</v-icon>Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteProduct(selectedProduct)">
            <v-icon>delete_forever</v-icon>Eliminar Categoria
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- NOTIFICACION -->
    <v-snackbar v-model="snackbar" :color="snackColor" :timeout="2200">
      {{snackText}}
      <v-icon dark>{{snackIcon}}</v-icon>
    </v-snackbar>
  </div>
</template>

<script>
import config from "@/assets/js/config";
import graphQL from "@/assets/js/graphQL";
var moment = require("moment");
const axios = require("axios");

export default {
  layout: "default",
  components: {},
  beforeMount() {
    this.getUser();
    this.getCategories();
    this.getOrders();
  },
  data() {
    return {
      model: "tab-1",
      search: "",
      logged: false,
      rolUser: false,
      dialog: false,
      dialogDelete: false,
      dialogCategory: false,
      dialogDeleteCategory: false,
      loading: null,
      snackbar: false,
      snackText: "",
      snackColor: "",
      snackIcon: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Código", value: "code" },
        { text: "Nombre", value: "name" },
        { text: "Categoria", value: "category" },
        { text: "Precio", value: "price" },
        { text: "Cantidad", value: "quantity" },
        { text: "Acciones", value: "actions" }
      ],
      headersCat: [
        { text: "ID", value: "id" },
        { text: "Nombre", value: "name" },
        { text: "Icono", value: "icon" },
        { text: "Acciones", value: "actions" }
      ],
      headersOrder: [
        { text: "ID", value: "id" },
        { text: "Dirección", value: "address" },
        { text: "Teléfono", value: "phone" },
        { text: "Fecha", value: "order_date" },
        { text: "Usuario", value: "user" }
      ],
      products: [],
      categories: [],
      categoriesNames: [],
      orders: [],
      selectedProduct: {
        category: {
          name: ""
        }
      },
      selectedCategory: {},
      pagination: {},
      accion: "",
      valid: false
    };
  },
  methods: {
    comprobarCampos() {
      if (
        this.selectedProduct.code == "" ||
        this.selectedProduct.name == "" ||
        this.selectedProduct.description == "" ||
        this.selectedProduct.image == "" ||
        this.selectedProduct.price == "" ||
        this.selectedProduct.quantity == ""
      ) {
        this.snackbar = true;
        this.snackText = "Debe completar todos los campos";
        this.snackColor = "error";
        this.snackIcon = "error";
      } else {
        if (this.accion == "Nuevo") {
          this.addProduct(this.selectedProduct);
        } else if (this.accion == "Editar") {
          this.editProduct(this.selectedProduct);
        }
      }
    },
    getProducts() {
      this.loading = true;
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `{
            products {
                id,
                code,
                name,
                description,
                price,
                image,
                quantity,
                category {
                  id,
                  name
                }
            }
          }`
        }
      }).then(result => {
        this.loading = false;
        this.products = result.data.data.products;
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
          result.categories.forEach(element => {
            this.categoriesNames.push(element.name);
            this.categories.push(element);
          });
        });
    },
    getOrders() {
      this.loading = true;
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: graphQL.queries.orders
        }
      })
        .then(result => result.data.data)
        .then(result => {
          this.loading = false;
          this.orders = result.orders;
          this.orders.forEach(element => {
            element.order_date = moment
              .unix(element.order_date / 1000)
              .utc()
              .format("DD/MM/YYYY");
          });
        });
    },
    editAction(item, type) {
      if (type == "product") {
        this.dialog = true;
        this.selectedProduct = item;
      } else if (type == "category") {
        this.dialogCategory = true;
        this.selectedCategory = item;
      }
      this.accion = "Editar";
    },
    cancel() {
      this.getProducts();
      this.getCategories();
      this.dialog = false;
      this.dialogCategory = false;
    },
    newAction(type) {
      if (type == "product") {
        this.dialog = true;
        this.accion = "Nuevo";
        this.selectedProduct = {
          category: {
            name: ""
          }
        };
      } else if (type == "category") {
        this.dialogCategory = true;
        this.accion = "Nueva";
        this.selectedCategory = {};
      }
    },
    deleteAction(item, type) {
      this.accion = "Eliminar";
      if (type == "product") {
        this.dialogDelete = true;
        this.selectedProduct = item;
      } else if (type == "category") {
        this.selectedCategory = item;
        this.dialogDeleteCategory = true;
      }
    },
    getUser() {
      var rol = config.cookie.rol;
      this.rolUser = this.$cookie.get(rol);
      var username = config.cookie.username;
      this.user = this.$cookie.get(username);

      if (this.rolUser != "true") {
        alert("No tiene permisos de administrador.");
        this.$router.push("/");
      } else {
        this.getProducts();
      }
    },
    getCategory(nombre) {
      var id = null;
      this.categories.forEach(element => {
        if (element.name == nombre) {
          id = element.id;
        }
      });
      return id;
    },
    addCategory() {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              addCategory(
                name: "${this.selectedCategory.name}",
                icon: "${this.selectedCategory.icon}") {
                id,
                name,
                icon
              }
            }
          `
        }
      })
        .then(response => {
          console.log("Creado", response.data.data.addCategory);
        })
        .then(_product => {
          this.dialogCategory = false;
          this.snackText = "Categoria añadida exitosamente";
          this.snackColor = "success";
          this.snackIcon = "check";
          this.snackbar = true;
          this.getCategories();
        });
    },
    editCategory() {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              editCategory(id: ${this.selectedCategory.id},
                name: "${this.selectedCategory.name}",
                icon: "${this.selectedCategory.icon}") {
                id,
                name,
                icon
              }
            }
          `
        }
      })
        .then(response => {
          console.log("Editado", response.data.data.editCategory);
        })
        .then(_product => {
          this.dialogCategory = false;
          this.snackText = "Categoria editada exitosamente";
          this.snackColor = "success";
          this.snackIcon = "check";
          this.snackbar = true;
          this.getCategories();
        });
    },

    addProduct(product) {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              createProduct(product: {
                code: "${product.code}",
                name: "${product.name}",
                description: "${product.description}",
                price: ${product.price},
                image:"${product.image}",
                quantity: ${product.quantity},
                categoryId: ${this.getCategory(product.category.name)}
              }) {
                id,
                code,
                name,
                description,
                price,
                image,
                quantity,
                category {
                  id,
                  name
                }
              }
            }
          `
        }
      })
        .then(response => {
          console.log("Creado", response.data.data.createProduct);
        })
        .then(_product => {
          this.dialog = false;
          this.snackText = "Producto añadido exitosamente";
          this.snackColor = "success";
          this.snackIcon = "check";
          this.snackbar = true;
          this.getProducts();
        });
    },
    editProduct(product) {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              updateProduct(productId: ${product.id},
                product: {
                code: "${product.code}",
                name: "${product.name}",
                description: "${product.description}",
                price: ${product.price},
                image:"${product.image}",
                quantity: ${product.quantity},
                categoryId: ${this.getCategory(product.category.name)}
              }) {
                id,
                code,
                name,
                description,
                price,
                image,
                quantity,
                category {
                  id,
                  name
                }
              }
            }
          `
        }
      })
        .then(response => {
          console.log("Editado", response.data.data.updateProduct);
        })
        .then(_product => {
          this.dialog = false;
          this.snackText = "Producto editado exitosamente";
          this.snackColor = "success";
          this.snackIcon = "check";
          this.snackbar = true;
          this.getProducts();
        });
    },
    deleteProduct(product) {
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `
            mutation {
              deleteProduct(id: ${product.id}) {
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
      })
        .then(response => {
          console.log("ELIMINADO", response.data.data.deleteProduct);
        })
        .then(_product => {
          this.dialogDelete = false;
          this.snackText = "Producto ELIMINADO exitosamente";
          this.snackColor = "warning";
          this.snackIcon = "check";
          this.snackbar = true;
          this.getProducts();
        });
    }
  }
};
</script>
