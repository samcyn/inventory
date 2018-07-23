import createPersistedState from 'vuex-persistedstate';
import * as Cookies from "js-cookie";
import cookie from 'cookie'

export default ({store, req, isDev}) => {
  createPersistedState({
    paths: ['user', 'token'],
    storage: {
      getItem: (key) => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie||'')[key],
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}

// export default ({store}) => {
//   createPersistedState({
//     paths: ['user, token'],
//     storage: {
//       getItem: key => Cookies.get(key),
//       // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
//       setItem: (key, value) =>
//         Cookies.set(key, value, { expires: 3, secure: true }),
//       removeItem: key => Cookies.remove(key)
//     }
//   })(store);
// }

// export default ({store, isHMR}) => {
//   // In case of HMR, mutation occurs before nuxReady, so previously saved state
//   // gets replaced with original state received from server. So, we've to skip HMR.
//   // Also nuxtReady event fires for HMR as well, which results multiple registration of
//   // vuex-persistedstate plugin
//   if (isHMR) return

//   window.onNuxtReady((nuxt) => {
//     createPersistedState()(store) // vuex plugins can be connected to store, even after creation
//   })
// }
     