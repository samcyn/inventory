import Cookie from 'js-cookie'


export const setUser = (token, user) => {
  if (process.SERVER_BUILD) return
  console.log(JSON.stringify(user))
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))
  Cookie.set('token', token);
  Cookie.set('user', user);
}

export const unsetUser = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  Cookie.remove('token')
  Cookie.remove('user')
  //window.localStorage.setItem('logout', Date.now())
}

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return
  const user = JSON.parse(decodeURIComponent(req.headers.cookie.split(';').find(c => c.trim().startsWith('user=')).split('=')[1]));
  if (!user) return
  return user ? user : null;
}

export const getUserTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const token = req.headers.cookie.split(';').find(c => c.trim().startsWith('token=')).split('=')[1];
  if (!token) return
  return token ? token : null;
}

export const getUserFromLocalStorage = () => {
  //const json = window.localStorage.user;
  const user = JSON.parse(window.localStorage.getItem('user'));
  return user ? user : null
}

export const getUserTokenFromLocalStorage = () => {
  //const json = window.localStorage.user;
  const token = window.localStorage.getItem('token');
  return token ? token : null
}