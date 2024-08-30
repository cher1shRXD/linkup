import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/theme/themeContext";
import Router from "./components/router";

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App