<template>
  <v-app>
    <v-toolbar class="mx-lg-auto" sticky>
      <v-toolbar-items>
        <v-btn to="/" large depressed color="primary">
          <v-avatar>
            <img src="../assets/img/icono.png" alt="avatar" />
          </v-avatar>Verdulistas
        </v-btn>
      </v-toolbar-items>

      <v-spacer />
      <v-toolbar-items>
        <v-btn to="/catalogue" large depressed>Catálogo</v-btn>
        <v-btn to="/recipes" large depressed>Recetas</v-btn>
        <v-btn to="/points" large depressed>VerduPoints</v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-if="!logged" to="/login" depressed>
          <v-icon>person_add_disabled</v-icon>Ingresar
        </v-btn>

        <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition" openOnHover>
          <v-btn slot="activator" depressed v-if="logged">
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
  </v-app>
</template>


<script>
import config from "@/assets/js/config";

export default {
  components: {},
  beforeMount() {
    this.getUser();
  },
  data() {
    return {
      logged: false,
      user: "",
      rolUser: "",
      entityUser: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    getUser() {
      var username = config.cookie.username;
      var rol = config.cookie.roles;
      this.rolUser = this.$cookie.get(rol);
      this.user = this.$cookie.get(username);
      if (this.user) {
        this.logged = true;
      }
    },
    exit() {
      this.$cookie.delete(config.cookie.userid);
      this.$cookie.delete(config.cookie.username);
      this.$cookie.delete(config.cookie.rol);
      this.$cookie.delete(config.cookie.token);
      this.logged = false;
      this.$router.push("/");
    }
  }
};
</script>
