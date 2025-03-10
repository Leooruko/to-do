import React, { createContext, useState, useContext, ReactNode } from "react";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { Appearance } from "react-native";

// Define Theme Context Type
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Create Theme Context with default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    Appearance.getColorScheme() === "dark" ? DarkTheme : DefaultTheme
  );

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === DarkTheme ? DefaultTheme : DarkTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for Using Theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
