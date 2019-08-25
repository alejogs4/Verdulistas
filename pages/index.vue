<template>
  <div>
    <v-avatar tile size="60%">
      <img src="https://i.imgur.com/VlBmu6I.png" alt="avatar" />
    </v-avatar>
    <v-btn x-large depressed>
      <v-chip class="ma-2"
      x-large >  
        CATÁLOGO
        <v-icon left large color="primary">person</v-icon>
      </v-chip>
    </v-btn>
    <toast />
  </div>
</template>

<script>
import Toast from "@/components/Toast";
import config from "@/assets/js/config";
import routes from "@/assets/js/routes";
export default {
  layout: "default",
  components: {
    Toast
  },
  beforeMount() {},
  data() {
    return {
      message: ""
    };
  },
  methods: {}
};
</script>
