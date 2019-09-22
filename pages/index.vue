<template>
  <div>
    <v-layout justify-center>
      <v-flex>
        <v-layout row wrap>
          <v-flex>
            <v-card color="info" class="white--text" fill-height>
              <v-card-title primary-title>
                <v-btn to="/catalogue" large flat dark>
                  <center class="hidden-sm-and-down">
                    <h1>¡Visita nuestro catálogo!</h1>
                  </center>
                  <center class="hidden-md-and-up">
                    <h3>¡Visita nuestro catálogo!</h3>
                  </center>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <h3>Las mejores verduras del campo.</h3>
                <h3>Listas para lo que quieras.</h3>
                <h3>Frescas, empacadas al vacío.</h3>
                <h3>Recíbelas en la comodidad de tu casa.</h3>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn to="/catalogue" large flat dark>
                  <center class="hidden-sm-and-down">
                    <v-icon left>visibility</v-icon>Haz click para ver todos nuestros productos
                  </center>
                  <center class="hidden-md-and-up">
                    <v-icon left>visibility</v-icon>Ver todos los productos
                  </center>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card color="secondary" outline>
              <v-img src="https://i.imgur.com/VlBmu6I.png" block></v-img>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md2 class="hidden-sm-and-down">
            <v-card color="secondary" outline>
              <v-img src="https://i.imgur.com/jGxwEbH.png"></v-img>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card color="primary" class="white--text" fill-height>
              <v-card-title primary-title>
                <v-btn large flat dark>
                  <center class="hidden-sm-and-down">
                    <h1>¡Descarga nuestra APP MOVIL!</h1>
                  </center>
                  <center class="hidden-md-and-up">
                    <h3>¡Descarga nuestra APP!</h3>
                  </center>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <h3>Encuentra todos nuestros productos.</h3>
                <h3>Disfruta de todos nuestros servicios.</h3>
                <h3>Todo Verdulistas en tu celular.</h3>
                <h3>Recíbelas en la comodidad de tu casa.</h3>
                <h3>
                  <i>
                    - Disponible en Android
                    <v-icon>android</v-icon>-
                  </i>
                </h3>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat dark>
                  <v-icon large left>cloud_download</v-icon>Haz click aquí para descargar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 class="hidden-md-and-up">
            <v-card color="secondary" outline>
              <v-img src="https://i.imgur.com/jGxwEbH.png"></v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  layout: "default",
  components: {},
  beforeMount() {},
  data() {
    return {
      message: ""
    };
  },
  methods: {}
};
</script>
