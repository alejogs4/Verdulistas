<template>
  <v-container fluid fill-height class="responsive">
    <v-layout align-center justify-center>
      <v-flex xs12 md8 lg6>
        <v-tabs light slider-color="warning">
          <v-tab active>
            <v-btn :color="colorL" @click="setTab('login')" depressed outline>
              <v-icon>how_to_reg</v-icon>Iniciar sesión
            </v-btn>
          </v-tab>
          <v-tab>
            <v-btn :color="colorR" @click="setTab('register')" depressed outline>
              <v-icon>add_circle_outline</v-icon>Registrarse
            </v-btn>
          </v-tab>
          <v-spacer></v-spacer>
          <v-tab>
            <v-btn to="/" color="error" depressed outline>
              <v-icon>exit_to_app</v-icon>Volver
            </v-btn>
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <div v-if="selected">
          <v-flex xs12 sm12 md12 class="pb-3">
            <v-card elevation="15">
              <v-card-title class="primary">
                <h1 class="text-center">
                  <strong>{{ title }}</strong>
                </h1>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-if="title == 'Iniciar sesión'" v-model="valid">
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
                  <v-btn :disabled="!valid" class="success" @click="login()">
                    <v-icon>{{ icon }}</v-icon>
                    {{ title }}
                  </v-btn>
                  <v-btn @click="limpiarCampos()" outline>
                    <v-icon>restore</v-icon>LIMPIAR CAMPOS
                  </v-btn>
                </v-form>

                <v-form ref="form" v-if="title == 'Registrarse'" v-model="valid">
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
                  <v-btn :disabled="!valid" class="success" @click="register()">
                    <v-icon>{{ icon }}</v-icon>
                    {{ title }}
                  </v-btn>
                  <v-btn @click="limpiarCampos()" outline>
                    <v-icon>restore</v-icon>LIMPIAR CAMPOS
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-progress-linear color="info" indeterminate v-if="loading"></v-progress-linear>
              <v-alert :value="error" color="error">
                <h3>
                  <v-icon dark left>error</v-icon>
                  <i>{{ errorText }}</i>
                </h3>
              </v-alert>
              <v-alert :value="success" color="info">
                <h3>
                  <v-icon dark left>assignment_turned_in</v-icon>
                  <i>{{ successText }}</i>
                </h3>
              </v-alert>
            </v-card>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
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
    this.setTab("login");
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
      selected: false,
      title: "",
      icon: "",
      colorL: "",
      colorR: "",
      user: {},
      token: "",
      error: false,
      errorText: "",
      success: false,
      successText: ""
    };
  },
  methods: {
    setTab(tab) {
      let self = this;
      self.limpiarCampos();
      if (tab == "login") {
        self.title = "Iniciar sesión";
        self.icon = "done_outline";
        self.colorL = "warning";
        self.colorR = "";
      } else {
        self.title = "Registrarse";
        self.icon = "save";
        self.colorR = "warning";
        self.colorL = "";
      }
      self.selected = true;
    },

    limpiarCampos() {
      let self = this;
      self.emailLog = "";
      self.passwordLog = "";
      self.name = "";
      self.lastname = "";
      self.email = "";
      self.password = "";
      self.confpassword = "";
      self.error = false;
      self.loading = false;
      self.success = false;
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
                  admin
                },
                token
              }
            }
          `
        }
      }).then(result => {
        if (result.data.errors) {
          this.error = true;
          this.errorText = "Email o contraseña incorrectos, intente de nuevo.";
          this.loading = false;
        } else {
          this.token = result.data.data.signIn.token;
          this.user = result.data.data.signIn.user;
          this.$cookie.set(config.cookie.token, this.token);
          this.$cookie.set(config.cookie.userid, this.user.id);
          this.$cookie.set(config.cookie.username, this.user.name);
          this.$cookie.set(config.cookie.rol, this.user.admin);
          this.loading = false;
          this.success = true;
          this.error = false;
          this.successText = `Bienvenido a Verdulistas, ${this.user.name}!`;
          setTimeout(() => this.$router.push("/catalogue"), 1500);
        }
      });
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
            this.error = true;
            this.errorText =
              "Error en el registro, posiblemente ya tenga una cuenta registrada";
            this.loading = false;
          } else {
            this.error = false;
            this.loading = false;
            this.success = true;
            var email = result.data.data.signUp.email;
            this.successText = `Registro completo! Ahora puedes iniciar sesión con: ${email}`;
            setTimeout(() => this.setTab("login"), 1000);
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
