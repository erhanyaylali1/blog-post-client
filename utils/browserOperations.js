import cookie from 'js-cookie';

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, { expires: 1 });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const getLocalStorage = (key) => {
  if (process.browser) {
    return JSON.parse(localStorage.getItem(key));
  }
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
  if (process.browser) {
    const isCookieExist = getCookie('token');
    if (isCookieExist) {
      const user = getLocalStorage('user');
      if (user) return user;
    }
  }
  return false;
};
