export default function ({ store, redirect, route}) {
  console.log('AUTH MIDDLEWARE', route, store);
  const userIsLoggedIn = store.state.isUserLoggedIn;
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