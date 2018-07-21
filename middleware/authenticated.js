export default function ({ store, redirect }) {
  console.log('dashboard', store);
  if (store.getters.isAuthenticated) {
    return redirect('/')
  }
}