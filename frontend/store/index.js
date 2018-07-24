export const state = () => ({
  user: null,
  token: null,
  navOpen: false
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null;
  },
  SET_TOKEN (state, token) {
    state.token = token || null;
  },
  SET_NAVOPEN (state, value) {
    state.navOpen = value;
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.token;
  },
  loggedUser (state) {
    return state.user;
  },
  isNavOpen (state) {
    return state.navOpen;
  }
}

export const actions = {
  setToken ({commit}, token) {
    commit('SET_TOKEN', token);
  },
  setUser ({commit}, user) {
    commit('SET_USER', user);
  },
  setNavOpen({commit}, value) {
    commit('SET_NAVOPEN', value);
  }
}
