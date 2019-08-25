<template>
  <div>
    <v-layout justify-center>
      <v-flex >
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex>
                <v-card color="primary">
                  <v-img src="https://i.imgur.com/VlBmu6I.png" block>
                  </v-img>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card>
                  <v-img src="https://i.imgur.com/VlBmu6I.png" height="200px">
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

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
