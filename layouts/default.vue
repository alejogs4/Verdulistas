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
        <v-btn to="/catalogue" @click="setPage('catalogue')" large depressed>Catálogo</v-btn>
        <v-btn to="/recipes" @click="setPage('recipes')" large depressed>Recetas</v-btn>
        <v-btn to="/points" @click="setPage('points')" large depressed>VerduPoints</v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-if="!logged" to="/login" tile depressed>
          <v-icon>person_add_disabled</v-icon>Ingresar
        </v-btn>

        <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition" openOnHover>
          <v-btn slot="activator" depressed v-if="logged">
            <v-chip>
              <v-icon left color="primary">person</v-icon>
              {{ user }}
            </v-chip>
          </v-btn>
          <v-card>
            <v-list dense>
              <v-btn to="/profile" color="info" depressed>
                <v-icon>account_circle</v-icon>Perfil
              </v-btn>
              <v-btn @click="exit()" color="warning" depressed>
                Salir
                <v-icon right>exit_to_app</v-icon>
              </v-btn>
            </v-list>
          </v-card>
        </v-menu>
        <v-btn v-if="activePage == 'catalogue'" tile depressed color="primary">
          <v-icon>shopping_cart</v-icon>Carrito
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container>
      <nuxt />
    </v-container>
    <toast />
  </v-app>
</template>


<script>
import config from "@/assets/js/config";
import toast from "@/components/Toast";

export default {
  components: {
    toast
  },
  beforeMount() {
    this.getUser();
  },
  data() {
    return {
      logged: true,
      activePage: "",
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

      // Comprobación del logeo
      // if (this.user) {
      //   this.logged = true;
      // }
    },
    exit() {
      this.$cookie.delete(config.cookie.userid);
      this.$cookie.delete(config.cookie.username);
      this.$cookie.delete(config.cookie.roles);
      this.logged = false;
      this.$router.push("/");
    },
    setPage(page) {
      this.activePage = page;
    }
  }
};
</script>
