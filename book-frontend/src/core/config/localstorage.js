export const localStorageAction = (key, value) => {
  if (value) localStorage.setItem(key, value);
  else return localStorage.getItem(key);
};
