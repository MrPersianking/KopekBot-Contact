export default {
  target: "static",
  head: {
    title: "Köpek Bot Hata ve Öneri formu" || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', href: './kopek.ico' },
      {rel: 'stylesheet', href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" }
    ]
  },
  /*
  ** Global CSS
  */
  css: [],
  plugins: [],
  components: true,
  buildModules: [],
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/callback",
      home: "/"
    },
    strategies: {
      local: false,
      discord: {
        _scheme: "oauth2",
        authorization_endpoint: "https://discordapp.com/api/oauth2/authorize",
        userinfo_endpoint: "https://discordapp.com/api/users/@me",
        scope: ["identify"],
        client_id: "456119574165848075",
      }
    }
  },
  axios: {},
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
  }
}
