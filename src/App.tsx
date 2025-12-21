import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";
import MainView from "./components/MainView/MainView";
import { system } from "./theme";

function App() {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider forcedTheme="dark">
        <MainView />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
