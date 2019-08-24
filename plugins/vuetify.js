import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: '#9E9D24', // a color that is not in the material colors palette
    accent: '#827717',
    secondary: '#EEEEEE',
    info: '#004D40',
    warning: '#E65100',
    error: '#B71C1C',
    success: '#1B5E20',
  }
});
