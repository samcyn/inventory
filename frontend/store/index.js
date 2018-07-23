export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null;
  },
  SET_TOKEN (state, token) {
    state.token = token || null;
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
    commit('SET_USER', user);
  }
}
