<template>
  <v-card>
    <v-snackbar v-if="message!==''" v-model="show">
      {{message}}
      <v-btn flat color="white" @click.native="openToast(false)">Cerrar</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      message: 'getMessage'
    }),
    show: {
      get: function() {
        return this.$store.getters.showToast
      },
      set: function(newValue) {
        this.$store.commit('openToast', false)
      }
    }
  },
  methods: {
    ...mapMutations(['openToast'])
  }
}
</script>


