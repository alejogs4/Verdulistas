<template>
  <v-container fluid fill-height class="responsive">
    <v-layout justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-card-title>
            <v-icon color="success" large right>assignment_ind</v-icon>
            <h1>
              <strong>Perfil</strong>
            </h1>
          </v-card-title>
          <hr />
          <v-card-text>
            <v-card>
              <center>
                <v-card-title class="primary">
                  <v-avatar color="info">
                    <span class="white--text headline">{{initials}}</span>
                  </v-avatar>
                  <v-spacer></v-spacer>
                  <h1>
                    {{user.name}}
                    {{user.lastname}}
                  </h1>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="secondary">
                  <h2 v-if="user.admin == true" class="warning--text">
                    <v-icon color="warning">person</v-icon>Administrador
                  </h2>
                  <h2 v-else class="warning--text">
                    <v-icon color="warning">star</v-icon>Usuario
                  </h2>
                  <h2>{{user.email}}</h2>
                </v-card-text>
                <v-card-text>
                  <h3>Puntos acumulados</h3>
                  <v-progress-circular
                    :rotate="-90"
                    :size="100"
                    :width="15"
                    :value="user.bond"
                    color="primary"
                  >{{ user.bond }}</v-progress-circular>
                  <br />
                  <small>Estos puntos serán redimidos en su próxima compra</small>
                </v-card-text>
                <v-card-text class="secondary">
                  <h3>CÓDIGO DE REFERIDO</h3>
                  <v-chip color="primary">
                    <v-avatar class="info">
                      <v-icon>star</v-icon>
                    </v-avatar>
                    <strong>{{ user.referral_code }}</strong>
                  </v-chip>
                  <br />
                  <small>Dile a tus amigos que se registren con este código para que recibas bonificaciones!</small>
                </v-card-text>
              </center>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from "@/assets/js/config";
const axios = require("axios");

export default {
  layout: "default",
  components: {},
  mounted() {
    this.getUser();
  },

  data() {
    return {
      user: {},
      rolUser: "false",
      initials: ""
    };
  },
  watch: {},
  methods: {
    getUser() {
      var userCookie = config.cookie.user;
      this.user = JSON.parse(this.$cookie.get(userCookie));
      this.initials =
        this.user.name.split("")[0] + this.user.lastname.split("")[0];
      if (this.user == undefined) {
        alert("Inicie sesión");
        this.$router.push("/");
      }
      this.getProfile();
    },
    getProfile() {
      this.loading = true;
      axios({
        url: config.api.url,
        method: "POST",
        headers: { token: this.$cookie.get(config.cookie.token) },
        data: {
          query: `{
            profile(
              id: ${parseInt(this.user.id)}
            ) {
              id,
              name,
              lastname,
              email,
              admin,
              bond,
              referral_code
            }
          }`
        }
      })
        .then(result => result.data.data)
        .then(result => {
          this.loading = false;
          this.user = result.profile;
          this.$cookie.set(config.cookie.userid, this.user.id);
          this.$cookie.set(config.cookie.username, this.user.name);
          this.$cookie.set(config.cookie.rol, this.user.admin);
          this.$cookie.set(config.cookie.user, JSON.stringify(this.user));
          this.getUser();
        });
    }
  }
};
</script>