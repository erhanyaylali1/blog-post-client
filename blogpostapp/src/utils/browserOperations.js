import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
    cookie.remove(key, { expires: 1 });
};

export const getCookie = (key) => {
    return cookie.get(key);
};

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
};

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  next();
};

export const signOut = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};

export const isAuth = () => {
  const isCookieExist = getCookie('token');
  if (isCookieExist) {
    const user = getLocalStorage('user');
    if (user) return user;
  }
  return false;
};
