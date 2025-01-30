interface AuthUser {
  email: string;
  id: string;
}

export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER: 'auth_user'
};

export const storage = {
  getToken: () => localStorage.getItem(StorageKeys.AUTH_TOKEN),
  setToken: (token: string) => localStorage.setItem(StorageKeys.AUTH_TOKEN, token),
  removeToken: () => localStorage.removeItem(StorageKeys.AUTH_TOKEN),
  
  getUser: () => {
    const user = localStorage.getItem(StorageKeys.USER);
    return user ? JSON.parse(user) as AuthUser : null;
  },
  setUser: (user: any) => localStorage.setItem(StorageKeys.USER, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(StorageKeys.USER),
  
  clearAuth: () => {
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.USER);
  }
}; 