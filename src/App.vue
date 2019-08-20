<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light" sticky>
        <b-navbar-brand to="/">
          <img
            src="./assets/images/icono.png"
            class="d-inline-block align-top"
            width="50"
            height="50"
          />
        </b-navbar-brand>

        <b-navbar-brand to="/">Verdulistas</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/about">VerduPoints</b-nav-item>
            <b-nav-item href="#">Referidos</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content">
                <img
                  src="./assets/images/person.png"
                  class="d-inline-block align-top"
                  width="30"
                  height="30"
                />Usuario
              </template>
              <b-dropdown-item to="/register">Registrarse</b-dropdown-item>
              <b-dropdown-item @click="inicio()">Iniciar sesión</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item href="#">
              <img
                src="./assets/images/shopping.png"
                class="d-inline-block align-top"
                width="30"
                height="30"
              />Carrito
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container>
      <router-view />
    </b-container>

    <b-modal hide-footer id="modal-1" title="Iniciar sesión">
      <b-form>
        <b-form-group id="input-group-2" label="Nombre usuario:" label-for="input-2">
          <b-form-input id="input-2" v-model="name" required placeholder="Ingrese nombre"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Contraseña:" label-for="input-3">
          <b-form-input
            id="input-3"
            type="password"
            v-model="password"
            required
            placeholder="Ingrese contraseña"
          ></b-form-input>
        </b-form-group>

        <b-button variant="secondary">Login</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    inicio() {
      this.$bvModal.show("modal-1");
    }
  }
};
</script>
