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
          <hr/>
          <v-card-text>
            <v-card>
              <v-card-title>
                <v-avatar color="teal">
      <span class="white--text headline"></span>
    </v-avatar>
                <h2>{{user.name}} {{user.lastname}}</h2>
                </v-card-title>
                <v-card-text>
                  <h3>{{user.email}}</h3>
                </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from "@/assets/js/config";

export default {
  layout: "default",
  components: {},
  mounted() {
    this.getUser();
  },

  data() {
    return {
      user: {},
      rolUser: "false"
    };
  },
  watch: {},
  methods: {
    getUser() {
      var userCookie = config.cookie.user;
      this.user = JSON.parse(this.$cookie.get(userCookie));
      if (this.user == undefined) {
        alert("Inicie sesión");
        this.$router.push("/");
      }
      console.log(this.user);
    }
  }
};
</script>