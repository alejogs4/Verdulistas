<template>
  <v-app>
    <v-toolbar class="auto" sticky>
      <v-toolbar-items>
        <v-btn to="/" large depressed color="primary" class="hidden-sm-and-down">
          <v-avatar>
            <img src="../assets/img/icono.png" alt="avatar" />
          </v-avatar>Verdulistas
        </v-btn>

        <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
          <v-btn slot="activator" class="hidden-md-and-up" large depressed color="primary">
            <v-icon left>dehaze</v-icon>
            <v-avatar>
              <img src="../assets/img/icono.png" alt="avatar" />
            </v-avatar>Verdulistas
          </v-btn>
          <v-list dense>
            <v-list-tile to="/">
              <v-icon left>home</v-icon>Inicio
            </v-list-tile>
            <v-list-tile to="/catalogue">
              <v-icon left>widgets</v-icon>Catálogo
            </v-list-tile>
            <!-- <v-list-tile to="/recipes">
              <v-icon left>receipt</v-icon>Recetas
            </v-list-tile> -->
            <!-- <v-list-tile to="/points">
              <v-icon left>important_devices</v-icon>VerduPoints
            </v-list-tile> -->
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/catalogue" large depressed flat>Catálogo</v-btn>
        <!-- <v-btn to="/recipes" large depressed>Recetas</v-btn> -->
        <!-- <v-btn to="/points" large depressed>VerduPoints</v-btn> -->
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-menu
          v-if="!logged"
          offset-y
          content-class="dropdown-menu"
          transition="slide-y-transition"
        >
          <v-btn slot="activator" depressed>
            <v-icon>person_add_disabled</v-icon>Ingresar
          </v-btn>
          <v-card>
            <v-list dense>
              <v-btn to="/login" small depressed outline>
                <v-icon>how_to_reg</v-icon>Iniciar sesión
              </v-btn>
              <v-btn to="/register" small depressed outline>
                <v-icon>add_circle_outline</v-icon>Registrarse
              </v-btn>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu
          v-if="logged"
          offset-y
          content-class="dropdown-menu"
          transition="slide-y-transition"
        >
          <v-btn slot="activator" depressed>
            <v-chip>
              <v-avatar>
                <v-icon color="primary">account_circle</v-icon>
              </v-avatar>
              <strong>{{ user }}</strong>
            </v-chip>
          </v-btn>
          <v-card>
            <v-list dense>
              <v-btn to="/profile" color="info" depressed outline>
                <v-icon>person</v-icon>Perfil
              </v-btn>
              <v-btn v-if="rolUser == 'true'" to="/admin" color="warning" depressed outline>
                <v-icon>account_box</v-icon>Admin
              </v-btn>
              <v-btn @click="exit()" color="error" depressed outline>
                Salir
                <v-icon right>exit_to_app</v-icon>
              </v-btn>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-container>
      <nuxt />
    </v-container>

    <v-snackbar v-model="snackbar" color="error" :timeout="2500">
      Ha cerrado sesión
      <v-icon dark>exit_to_app</v-icon>
    </v-snackbar>

    <v-footer class="pa-3" color="secondary">
      <v-spacer></v-spacer>
      <div>Verdulistas &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>


<script>
import config from "@/assets/js/config";

export default {
  mounted() {
    this.getUser();
  },
  data() {
    return {
      snackbar: false,
      logged: false,
      user: "",
      rolUser: false,
      entityUser: null
    };
  },
  methods: {
    getUser() {
      var rol = config.cookie.rol;
      this.rolUser = this.$cookie.get(rol);
      this.user = this.$cookie.get(config.cookie.username);
      if (this.user) {
        this.logged = true;
      }
    },
    exit() {
      this.$cookie.delete(config.cookie.userid);
      this.$cookie.delete(config.cookie.username);
      this.$cookie.delete(config.cookie.rol);
      this.$cookie.delete(config.cookie.token);
      this.$router.push("/");
      this.snackbar = true;
      this.logged = false;
    }
  }
};
</script>
