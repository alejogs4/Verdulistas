<template>
  <div>
    <v-tabs fixed-tabs color="secondary" light :slider-color="color">
      <v-tab active @click="setTab('login')">
        <v-icon>how_to_reg</v-icon>Iniciar sesión
      </v-tab>
      <v-tab @click="setTab('register')">
        <v-icon>add_circle_outline</v-icon>Registrarse
      </v-tab>
    </v-tabs>

    <div v-if="selected">
      <v-flex xs12 sm12 md12 class="pb-3">
        <v-card>
          <v-card-title class="primary">
            <h1 class="text-center">
              <strong>{{ title }}</strong>
            </h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-if="title == 'Iniciar sesión'" v-model="valid">
              <v-text-field
                v-model="emailLog"
                type="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="passwordLog"
                type="password"
                :rules="rules"
                label="Contraseña"
                required
              ></v-text-field>
              <v-btn :disabled="!valid" class="success" @click="login()">
                <v-icon>{{ icon }}</v-icon>
                {{ title }}
              </v-btn>
              <v-btn @click="limpiarCampos()">
                <v-icon>loop</v-icon>LIMPIAR CAMPOS
              </v-btn>
            </v-form>

            <v-form ref="form" v-if="title == 'Registrarse'" v-model="valid">
              <v-text-field v-model="name" type="text" :rules="rules" label="Nombre" required></v-text-field>
              <v-text-field v-model="lastname" type="text" :rules="rules" label="Apellido" required></v-text-field>
              <v-text-field
                v-model="email"
                type="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="Contraseña"
                required
              ></v-text-field>
              <v-text-field
                v-model="confpassword"
                type="password"
                :rules="passwordRules"
                label="Confirmar contraseña"
                required
              ></v-text-field>
              <v-btn :disabled="!valid" class="success" @click="login()">
                <v-icon>{{ icon }}</v-icon>
                {{ title }}
              </v-btn>
              <v-btn @click="limpiarCampos()">
                <v-icon>loop</v-icon>LIMPIAR CAMPOS
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </div>
    <toast />
  </div>
</template>

<script>
import toast from "@/components/Toast";
import config from "@/assets/js/config";

export default {
  components: {
    toast
  },
  beforeMount() {
    this.setTab("login");
  },
  data() {
    return {
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
        v => (v && v.length > 6) || "Contraseña debe ser mayor de 6 caracteres"
      ],
      rules: [v => !!v || "Campo obligatorio"],
      selected: false,
      title: "",
      icon: "",
      color: "secondary"
    };
  },
  methods: {
    setTab(tab) {
      let self = this;
      self.limpiarCampos();
      if (tab == "login") {
        self.title = "Iniciar sesión";
        self.icon = "done_outline";
      } else {
        self.title = "Registrarse";
        self.icon = "save";
      }
      self.color = "success";
      self.selected = true;
    },
    limpiarCampos() {
      let self = this;
      self.emailLog = "";
      self.passwordLog = "";
      self.lastname = "";
      self.confpassword = "";
      self.name = "";
      self.email = "";
      self.password = "";
    }
  }
};
</script>