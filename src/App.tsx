import { ChakraProvider } from "@chakra-ui/react";
import MainView from "./components/MainView/MainView";
import { system } from "./theme";

function App() {
  return (
    <ChakraProvider value={system}>
      <MainView />
      test
    </ChakraProvider>
  );
}

export default App;
