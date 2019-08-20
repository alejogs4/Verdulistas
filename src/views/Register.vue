<template>
  <div class="inscripcion">
    <div class="mt-2">
      <b-card
        header="Registro"
        title="Ingrese sus datos"
        header-bg-variant="secondary"
        header-text-variant="light"
      >
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Correo electrónico:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              required
              placeholder="Ingrese correo"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="name"
              required
              placeholder="Ingrese nombre"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Contraseña:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="password"
              v-model="password"
              required
              placeholder="Ingrese contraseña"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Confirmar contraseña:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="password"
              v-model="confpassword"
              required
              placeholder="Confirme contraseña"
            ></b-form-input>
          </b-form-group>

          <b-button @click="sendEmail" variant="secondary"
            >Registrarse</b-button
          >
        </b-form>
      </b-card>
      <b-alert
        class="mt-5"
        :show="dismissCountDown2"
        dismissible
        variant="info"
        @dismissed="dismissCountDown2 = 0"
        @dismiss-count-down="countDownChanged2"
      >
        Registrado correctamente!
      </b-alert>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      confpassword: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDown2: 0
    };
  },
  methods: {
    limpiarCampos() {
      this.email = "";
      this.name = "";
      this.url = "";
    }
  }
};
</script>
