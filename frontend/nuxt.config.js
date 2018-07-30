module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Cubventory App',
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
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' },
    { src: 'simple-line-icons/scss/simple-line-icons.scss', lang: 'scss'}
  ],
  // router set up
  router: {
    middleware: ['auth'],
    linkExactActiveClass: 'is-active'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#FE6346' },

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
  plugins: [
    { src: '~/plugins/vue_moment.js', ssr: false }, 
    { src: '~/plugins/vue_underscore.js', ssr: false },
    { src: '~plugins/vue_chart.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-moment', 'vue-underscore'],
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
