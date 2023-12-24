export const localStorageSetItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

export const localStorageGetItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  // window객체 localStorage, sessionStorage는 값이 없을때 null
  return null;
};

export const localStorageRemoveItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const localStorageClear = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};
