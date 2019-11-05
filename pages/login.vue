<template>
  <v-container fluid fill-height class="responsive">
    <v-layout align-center justify-center>
      <v-flex xs12 md8 lg6>
        <v-tabs light slider-color="warning">
          <v-tab active>
            <v-btn color="warning" depressed outline>
              <v-icon>how_to_reg</v-icon>Iniciar sesión
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
                  <strong>Iniciar sesión</strong>
                </h1>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="emailLog"
                    prepend-icon="email"
                    type="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="passwordLog"
                    prepend-icon="lock"
                    type="password"
                    :rules="rules"
                    label="Contraseña"
                    required
                  ></v-text-field>
                  <center>
                    <v-btn :disabled="!valid" class="success" @click="login()">
                      <v-icon>done_all</v-icon>Iniciar sesión
                    </v-btn>
                    <v-btn @click="limpiarCampos()" outline id="clear-fields-id">
                      <v-icon>restore</v-icon>LIMPIAR CAMPOS
                    </v-btn>
                  </center>
                </v-form>
              </v-card-text>
              <v-progress-linear color="info" indeterminate v-if="loading"></v-progress-linear>
            </v-card>
            <br>
            <center>
              <v-btn to="/register" large outline color="black">No tienes cuenta? <br> Regístrate aquí</v-btn>
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
      emailLog: "",
      passwordLog: "",
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
      self.emailLog = "";
      self.passwordLog = "";
    },

    login() {
      this.loading = true;
      axios({
        url: config.api.url,
        method: "POST",
        data: {
          query: `
            mutation {
              signIn (email:"${this.emailLog}", password: "${
            this.passwordLog
          }") {
                user {
                  id,
                  name,
                  lastname,
                  email,
                  admin,
                  bond
                },
                token
              }
            }
          `
        }
      }).then(result => {
        if (result.data.errors) {
          this.snackbar = true;
          this.snackColor = "error";
          this.snackIcon = "mood_bad";
          this.snackText = "Email o contraseña incorrectos, intente de nuevo.";
          this.loading = false;
        } else {
          this.token = result.data.data.signIn.token;
          this.user = result.data.data.signIn.user;
          this.$cookie.set(config.cookie.token, this.token);
          this.$cookie.set(config.cookie.userid, this.user.id);
          this.$cookie.set(config.cookie.username, this.user.name);
          this.$cookie.set(config.cookie.rol, this.user.admin);
          this.$cookie.set(config.cookie.user, JSON.stringify(this.user));
          this.loading = false;
          this.snackbar = true;
          this.snackColor = "success";
          this.snackIcon = "mood";
          this.snackText = `Bienvenido a Verdulistas, ${this.user.name}!`;
          setTimeout(() => this.$router.push("/catalogue"), 1500);
        }
      });
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
