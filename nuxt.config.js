module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: "Verdulistas",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "App web para Verdulistas" }
    ],
    link: [
      { rel: "icon", href: "/assets/img/icono.png" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  /*
  ** Global CSS
  */
  css: [
    "@/node_modules/vuetify/dist/vuetify.css",
    "@/node_modules/intro.js/minified/introjs.min.css",
    "@/node_modules/vuetify-datetime-picker/src/stylus/main.styl"
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/vuetify",
    "@/plugins/vue2-filters",
    "@/plugins/vue-moment",
    "@/plugins/vue-cookie",
    "@/plugins/vue-html",
    "@/plugins/vuetify-datetime-picker"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios"
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
};
