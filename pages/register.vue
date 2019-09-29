<template>
  <v-container fluid fill-height class="responsive">
    <v-layout align-center justify-center>
      <v-flex xs12 md8 lg6>
        <v-tabs light slider-color="warning">
          <v-tab active>
            <v-btn color="warning" depressed outline>
              <v-icon>add_circle_outline</v-icon>Registrarse
            </v-btn>
          </v-tab>
          <v-spacer></v-spacer>
          <v-tab>
            <v-btn to="/catalogue" color="error" depressed outline>
              <v-icon>exit_to_app</v-icon>Volver
            </v-btn>
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <div>
          <v-flex xs12 sm12 md12 class="pb-3">
            <v-card elevation="15">
              <v-card-title class="primary">
                <h1 class="text-center">
                  <strong>Registrarse</strong>
                </h1>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="name"
                    prepend-icon="person"
                    type="text"
                    :rules="rules"
                    label="Nombre"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    prepend-icon="supervisor_account"
                    type="text"
                    :rules="rules"
                    label="Apellido"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    prepend-icon="email"
                    type="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    type="password"
                    :rules="passwordRules"
                    label="Contraseña"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="confpassword"
                    prepend-icon="lock_open"
                    type="password"
                    :rules="passwordRules"
                    label="Confirmar contraseña"
                    required
                  ></v-text-field>
                  <center>
                    <v-btn :disabled="!valid" class="success" @click="register()">
                      <v-icon>save</v-icon>Registrarse
                    </v-btn>
                    <v-btn @click="limpiarCampos()" outline>
                      <v-icon>restore</v-icon>LIMPIAR CAMPOS
                    </v-btn>
                  </center>
                </v-form>
              </v-card-text>
              <v-progress-linear color="info" indeterminate v-if="loading"></v-progress-linear>
            </v-card>
            <br>
            <center>
              <v-btn to="/login" large outline color="black">Ya tienes cuenta? <br> Ingresa aquí</v-btn>
            </center>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar" :color="snackColor" :timeout="2500">
      {{ snackText }}
      <v-icon dark right>{{ snackIcon }}</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import config from "@/assets/js/config";
const axios = require("axios");

export default {
  layout: "blank",
  components: {},
  beforeMount() {
    this.getUser();
  },
  data() {
    return {
      loading: false,
      valid: false,
      name: "",
      lastname: "",
      email: "",
      password: "",
      confpassword: "",
      emailRules: [
        v => !!v || "Ingrese e-mail",
        v => /.+@.+\..+/.test(v) || "E-mail debe ser válido"
      ],
      passwordRules: [
        v => !!v || "Ingrese contraseña",
        v =>
          (v && v.length >= 6) || "Contraseña debe ser de al menos 6 caracteres"
      ],
      rules: [v => !!v || "Campo obligatorio"],
      user: {},
      token: "",
      snackbar: false,
      snackIcon: "",
      snackColor: "",
      snackText: ""
    };
  },
  methods: {
    limpiarCampos() {
      let self = this;
      self.name = "";
      self.lastname = "";
      self.email = "";
      self.password = "";
      self.confpassword = "";
    },

    register() {
      if (this.password != this.confpassword) {
        this.error = true;
        this.errorText = "Las contraseñas deben coincidir.";
        this.loading = false;
      } else {
        this.loading = true;
        var user = {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        };
        axios({
          url: config.api.url,
          method: "POST",
          data: {
            query: `
            mutation register($user: UserInput!) {
              signUp (user: $user) {
                email
              }
            }
          `,
            variables: {
              user
            }
          }
        }).then(result => {
          if (result.data.errors) {
            this.snackbar = true;
            this.snackColor = "error";
            this.snackIcon = "mood_bad";
            this.snackText =
              "Error en el registro, posiblemente ya tenga una cuenta registrada";
            this.loading = false;
          } else {
            this.loading = false;
            this.success = true;
            this.snackbar = true;
            this.snackColor = "success";
            this.snackIcon = "mood";
            var email = result.data.data.signUp.email;
            this.snackText = `Registro completo! Ahora puedes iniciar sesión con: ${email}`;
            setTimeout(() => this.$router.push('/login'), 1000);
          }
        });
      }
    },

    getUser() {
      var username = config.cookie.username;
      this.user = this.$cookie.get(username);
      if (this.user) {
        alert("Ya se encuentra loggeado en una cuenta.");
        this.$router.push("/");
      }
    }
  }
};
</script>