export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
}

export interface AppActions {
  login: (user: User) => void;
  logout: () => void;
  toggleTheme: () => void;
  setLoading: (loading: boolean) => void;
}

export type AppContextType = AppState & AppActions;