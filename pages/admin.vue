<template>
  <div>
    <!-- TABLA DE PRODUCTOS -->
    <v-flex xs12>
      <v-toolbar flat>
        <v-toolbar-title>
          <h1>Productos</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="newAction()" color="primary" class="black--text">Nuevo producto</v-btn>
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
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="text-xs-right">{{ props.item.quantity }}</td>
          <td class="text-xs-left">
            <v-btn small icon outline color="info" @click="editAction(props.item)">
              <v-icon small>edit</v-icon>
            </v-btn>
            <v-btn small icon outline color="error" @click="deleteAction(props.item)">
              <v-icon small>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>

    <!-- DIALOGO DE EDICION Y CREACION -->
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
                <v-text-field v-model="selected.code" label="Código" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="selected.name" label="Nombre" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-textarea v-model="selected.description" label="Descripción"></v-textarea>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-img :src="selected.image" :lazy-src="selected.image" contain height="125"></v-img>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="selected.image" label="URL de imagen" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="selected.price"
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
                  v-model="selected.quantity"
                  label="Cantidad"
                  type="number"
                  :min="0"
                  required
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
          <v-btn v-if="accion == 'Editar'" color="success" @click="comprobarCampos()">
            <v-icon>edit</v-icon>Confirmar edición
          </v-btn>
          <v-btn v-if="accion == 'Nuevo'" color="success" @click="comprobarCampos()">
            <v-icon>create_new_folder</v-icon>Crear Producto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOGO DE ELIMINAR -->
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
              <v-img :src="selected.image" contain>
                <v-chip dark class="warning">
                  <strong>{{selected.name}}</strong>
                </v-chip>
              </v-img>
            </center>
            <v-card-actions>
              <v-chip label outline dark>
                <v-avatar>
                  <v-icon>label</v-icon>
                </v-avatar>
                <strong>{{selected.code}}</strong>
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip color="info" label outline dark>
                <v-avatar>
                  <v-icon>local_atm</v-icon>
                </v-avatar>
                <strong>Precio: ${{selected.price}}</strong>
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn outline @click="dialogDelete = false">
            <v-icon>clear</v-icon>Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteProduct(selected)">
            <v-icon>delete_forever</v-icon>Eliminar Producto
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
const axios = require("axios");

export default {
  layout: "default",
  components: {},
  beforeMount() {
    this.getUser();
  },
  data() {
    return {
      search: "",
      logged: false,
      rolUser: false,
      dialog: false,
      dialogDelete: false,
      loading: null,
      snackbar: false,
      snackText: "",
      snackColor: "",
      snackIcon: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Código", value: "code" },
        { text: "Nombre", value: "name" },
        { text: "Precio", value: "price" },
        { text: "Cantidad", value: "quantity" },
        { text: "Acciones", value: "actions" }
      ],
      products: [],
      selected: {},
      pagination: {},
      accion: "",
      valid: false
    };
  },
  methods: {
    comprobarCampos() {
      if (
        this.selected.code == "" ||
        this.selected.name == "" ||
        this.selected.description == "" ||
        this.selected.image == "" ||
        this.selected.price == "" ||
        this.selected.quantity == ""
      ) {
        this.snackbar = true;
        this.snackText = "Debe completar todos los campos";
        this.snackColor = "error";
        this.snackIcon = "error";
      } else {
        if (this.accion == "Nuevo") {
          this.addProduct(this.selected);
        } else if (this.accion == "Editar") {
          this.editProduct(this.selected);
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
                quantity
            }
          }`
        }
      }).then(result => {
        this.loading = false;
        this.products = result.data.data.products;
      });
    },
    editAction(product) {
      this.selected = product;
      this.accion = "Editar";
      this.dialog = true;
    },
    cancel() {
      this.getProducts();
      this.dialog = false;
    },
    newAction() {
      this.selected = {};
      this.accion = "Nuevo";
      this.dialog = true;
    },
    deleteAction(product) {
      this.selected = product;
      this.accion = "Eliminar";
      this.dialogDelete = true;
    },
    getUser() {
      var rol = config.cookie.rol;
      this.rolUser = this.$cookie.get(rol);
      var username = config.cookie.username;
      this.user = this.$cookie.get(username);

      if (this.rolUser == "false") {
        alert("No tiene permisos de administrador.");
        this.$router.push("/");
      } else {
        this.getProducts();
      }
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
                quantity: ${product.quantity}
              }) {
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
                quantity: ${product.quantity}
              }) {
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
