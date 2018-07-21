export const state = () => ({
  user: null,
  token: null,
  isUserLoggedIn: false
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null;
  },
  SET_TOKEN (state, token) {
    state.token = token || null;
    if (token) {
      state.isUserLoggedIn = true;
    } else {
      state.isUserLoggedIn = false;
    }
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.token;
  },
  loggedUser (state) {
    return state.user;
  }
}

export const actions = {
  setToken ({commit}, token) {
    commit('SET_TOKEN', token);
  },
  setUser ({commit}, user) {
    commit('SET_User', user);
  }
}
