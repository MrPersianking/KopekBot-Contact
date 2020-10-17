export default {
  target: 'static',
  rootDir: "./",
  srcDir: "src",
  head: {
    title: 'Köpek Bot Öneri ve Hata Formu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/kopek.ico' },
      { rel: 'stylesheet', href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" }
    ],
    script: [
      { src: "https://kit.fontawesome.com/14db8b9ac0.js", crossorigin: "anonymous" }
    ]
  },
  css: [],
  plugins: [{ src: "~/plugins/vuelidate" }],
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    redirect: {
      login: "/login",
      logout: "/logout",
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
  build: {}
}
