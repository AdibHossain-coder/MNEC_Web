import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Check local storage or system preference on initial load
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('nesc-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    // Apply the class to the root HTML element
    const root = window.document.documentElement
    
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    
    // Save preference
    localStorage.setItem('nesc-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}