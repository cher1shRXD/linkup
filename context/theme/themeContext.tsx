import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useColorScheme } from "react-native";

type Theme = {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  boxColor: string;
};

const lightTheme: Theme = {
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  borderColor: "#E1E1E1",
  iconColor: "#000",
  boxColor: "#F1F1F1",
};

const darkTheme: Theme = {
  backgroundColor: "#1b1b1b",
  textColor: "#FFFFFF",
  borderColor: "#242424",
  iconColor: "#b5b5b5",
  boxColor: "#1f2021",
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
