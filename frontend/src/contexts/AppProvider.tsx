import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { AppContextType, User } from './types';

// Estado inicial
const initialState: Omit<AppContextType, keyof AppActions> = {
  user: null,
  isAuthenticated: false,
  theme: 'light',
  loading: false,
};

// Crear el contexto (undefined obliga a usar el Provider)
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Props del Provider
interface AppProviderProps {
  children: ReactNode;
}

// Provider Component
export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState(initialState);

  // Actions memorizadas con useCallback
  const login = useCallback((user: User) => {
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
    }));
  }, []);

  const logout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      user: null,
      isAuthenticated: false,
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({
      ...prev,
      loading,
    }));
  }, []);

  // Value combinado (estado + acciones)
  const value: AppContextType = {
    ...state,
    login,
    logout,
    toggleTheme,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}