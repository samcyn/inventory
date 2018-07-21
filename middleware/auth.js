export default function ({ store, redirect, route}) {
  const userIsLoggedIn = !!store.getters.isAuthenticated;
  const urlRequiresAuth = /^\/dashboard(\/|$)/.test(route.fullPath)
  const urlRequiresNonAuth = /^\/(\/|$)/.test(route.fullPath)
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect('/')
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
    return redirect('/dashboard')
  }
  return Promise.resolve()
}