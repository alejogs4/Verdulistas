<template>
  <div>
    <v-tabs fixed-tabs color="secondary" light slider-color="primary">
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
          <v-card-title>
            <h1 class="text-center">
              <strong>{{ title }}</strong>
            </h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="formData" v-model="valid" lazy-validation>
              <factory-components :view="jsonView" :initialData="initialData" :editing="editing" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="primary" @click="saveData()">
              <v-icon>{{ icon }}</v-icon>
              {{ title }}
            </v-btn>
            <v-btn @click="limpiarCampos()">
              <v-icon>loop</v-icon>LIMPIAR CAMPOS
            </v-btn>
          </v-card-actions>
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
      selected: false,
      title: "",
      icon: ""
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
      self.selected = true;
    },
    limpiarCampos() {}
  }
};
</script>