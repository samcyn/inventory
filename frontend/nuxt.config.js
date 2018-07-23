module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // sass set up
  css: [
    { src: '~/assets/css/main.scss', lang: 'sass' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }
  ],
  // router set up
  router: {
    middleware: ['auth'],
    linkActiveClass: 'active-link'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /* 
  ** modules
  */
  modules: [
    '@nuxtjs/axios',
    ['nuxt-sass-resources-loader', '@/assets/css/variables.scss']
  ],

  axios: {
    // proxyHeaders: false
    baseURL: 'https://mighty-bastion-66032.herokuapp.com/apis/v1/'
  },

  // plugins
  //plugins: [{ src: '~/plugins/persistStore.js', ssr: false}],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}