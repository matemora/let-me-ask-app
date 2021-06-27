import { createContext, ReactNode, useState } from "react";

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

type ThemeContextProviderProps = {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider({children}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeContextType['theme']>(() => {
    const userTheme = localStorage.getItem('LETMEASK_DATA_THEME') as ThemeContextType['theme'];
    return userTheme ?? 'light';
  });

  function toggleTheme() {
    localStorage.setItem('LETMEASK_DATA_THEME', theme === 'light' ? 'dark' : 'light');
    setTheme(previousTheme => previousTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div data-theme={theme} className="app">
        {children}
      </div>
    </ThemeContext.Provider>
  )
}