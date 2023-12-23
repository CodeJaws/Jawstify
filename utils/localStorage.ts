class LocalStorage {
  constructor() {}

  static setItem(key: string, value: string) {
    if (typeof window != 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    // window객체 localStorage, sessionStorage는 값이 없을때 null
    return null;
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  static clear() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}

export default LocalStorage;
