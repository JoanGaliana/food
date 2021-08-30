import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Pages from './pages/Pages';

function App() {
  return (
    <ChakraProvider>
      <Pages></Pages>
    </ChakraProvider>
  );
}

export default App;