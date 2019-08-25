<template>
  <div>
    <v-img src="https://i.imgur.com/RwC0DsD.png" aspect-ratio="1" height="500"></v-img>
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
