<template>
  <v-app class="index">
    <v-layout align-center justify-center>

    </v-layout>
    <toast />
  </v-app>
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
  beforeMount() {
  },
  data() {
    return {
      loading: false,
      editing: false,
      message: ""
    };
  },
  methods: {
  }
};
</script>
