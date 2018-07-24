import { getUserFromCookie, getUserFromLocalStorage, getUserTokenFromCookie, getUserTokenFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const user = isServer ? getUserFromCookie(req) : getUserFromLocalStorage();
  const token = isServer ? getUserTokenFromCookie(req) : getUserTokenFromLocalStorage();  
  store.commit('SET_USER', user);
  store.commit('SET_TOKEN', token);
  store.commit('SET_NAVOPEN', false);
}