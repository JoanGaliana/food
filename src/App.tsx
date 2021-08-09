import React, { useMemo, useState } from 'react';
import { ChakraProvider, FormControl, FormLabel, Input, Box } from '@chakra-ui/react';
import './App.css';
import FoodComparationDelta from './components/FoodComparationDelta/FoodComparationDelta';
import SearchFood from './components/SearchFood/SearchFood';
import FoodFacts, { createEmptyFoodFacts } from './model/FoodFacts';
import equateFood from './services/equateFood';

function App() {
  const [sourceFood, setSourceFood] = useState<FoodFacts>(createEmptyFoodFacts());
  const [targetFood, setTargetFood] = useState<FoodFacts>(createEmptyFoodFacts());

  const [baseQuantity, setBaseQuantity] = useState(100);

  const factor = useMemo(() => equateFood(sourceFood, targetFood), [sourceFood, targetFood]);

  return (
    <ChakraProvider>
      <Box px="3rem" pt="2rem">
        <Box as="h3" fontSize="xl" fontWeight="bold">Search Food</Box>
        <SearchFood setSourceFood={setSourceFood} setTargetFood={setTargetFood}></SearchFood>

        <Box mt="10" as="h3" fontSize="xl" fontWeight="bold">Base Food</Box>

        <FormControl id="name">
          <FormLabel>Base quantity (g)</FormLabel>
          <Input type="number" min="0" defaultValue="100" onChange={(e) => { setBaseQuantity(Number.parseInt(e.target.value)) }} />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>

        {/* <FoodForm food={sourceFood} setFood={setSourceFood}></FoodForm> */}

        {/* <Box as="h3" fontSize="xl" fontWeight="bold">Target Food</Box> */}
        {/* <FoodForm food={targetFood} setFood={setTargetFood}></FoodForm> */}


        <Box mt="10" as="h3" fontSize="xl" fontWeight="bold">Result</Box>
        Factor: <Box as="span" fontSize="lg" fontWeight="bold">{factor.toFixed(2)}</Box>

        <FoodComparationDelta
          factor={factor}
          sourceFoodQuantity={baseQuantity}

          sourceFood={sourceFood}
          targetFood={targetFood}
        ></FoodComparationDelta>
      </Box>
    </ChakraProvider>
  );
}

export default App;
