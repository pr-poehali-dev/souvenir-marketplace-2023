import { User } from './api';

const USER_STORAGE_KEY = 'souvenir_user';
const TOKEN_STORAGE_KEY = 'souvenir_token';

export const auth = {
  saveUser: (user: User, token: string) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  getUser: (): User | null => {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(USER_STORAGE_KEY);
  },

  logout: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};
