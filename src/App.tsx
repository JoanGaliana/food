import { useCallback, useMemo, useState } from 'react';
import { ChakraProvider, FormControl, FormLabel, Input, Box, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, IconButton } from '@chakra-ui/react';
import './App.css';
import FoodComparationDelta from './components/FoodComparationDelta/FoodComparationDelta';
import SearchFood from './components/SearchFood/SearchFood';
import equateFood from './services/equateFood';
import FoodCard from './components/FoodCard/FoodCard';
import Food from './model/Food';
import { SearchIcon } from '@chakra-ui/icons';
import SearchFoodModal from './components/SearchFoodModal/SearchFoodModal';

function App() {
  const [sourceFood, setSourceFood] = useState<Food | null>(null);
  const [targetFood, setTargetFood] = useState<Food | null>(null);

  const [baseQuantity, setBaseQuantity] = useState(100);

  const factor = useMemo(() => sourceFood && targetFood ? equateFood(sourceFood?.foodFacts, targetFood?.foodFacts) : -1, [sourceFood, targetFood]);

  const targetFoodDisclousure = useDisclosure();
  const sourceFoodDisclousure = useDisclosure();

  return (
    <ChakraProvider>
      <Box px="3rem" pt="1rem">
        <SimpleGrid columns={{ "sm": 1, "md": 2 }} mb="2rem">
          <Box>
            <Box fontSize="xl" fontWeight="semibold" mb="0.75rem">
              Source food
              <IconButton ml="0.5rem" colorScheme={sourceFood ? "gray" : "blue"} aria-label="Search foods" onClick={sourceFoodDisclousure.onOpen} icon={<SearchIcon />}></IconButton>
            </Box>
            {sourceFood ? <FoodCard food={sourceFood}></FoodCard> : ""}
          </Box>
          <SearchFoodModal
            onClose={sourceFoodDisclousure.onClose}
            isOpen={sourceFoodDisclousure.isOpen}
            selectFoodButtonText="Select source food"
            selectFood={setSourceFood}>
          </SearchFoodModal>

          <Box>
            <Box fontSize="xl" fontWeight="semibold" mb="0.75rem">
              Target food
              <IconButton ml="0.5rem" colorScheme={targetFood ? "gray" : "blue"} aria-label="Search foods" onClick={targetFoodDisclousure.onOpen} icon={<SearchIcon />}></IconButton>
            </Box>
            {targetFood ? <FoodCard food={targetFood}></FoodCard> : ""}
          </Box>
          <SearchFoodModal
            onClose={targetFoodDisclousure.onClose}
            isOpen={targetFoodDisclousure.isOpen}
            selectFoodButtonText="Select target food"
            selectFood={setTargetFood}>
          </SearchFoodModal>
        </SimpleGrid>

        <Button onClick={() => {
          const aux = targetFood;

          setTargetFood(sourceFood);
          setSourceFood(aux);
        }}>Swap</Button>
        <FormControl id="name" mb="2rem">
          <FormLabel>Base quantity (g)</FormLabel>
          <Input type="number" min="0" defaultValue="100" onChange={(e) => { setBaseQuantity(Number.parseInt(e.target.value)) }} />
        </FormControl>

        {targetFood && sourceFood ? (
          <FoodComparationDelta
            factor={factor}
            sourceFoodQuantity={baseQuantity}

            sourceFood={sourceFood.foodFacts}
            targetFood={targetFood.foodFacts}
          ></FoodComparationDelta>
        ) : ""}
      </Box>

    </ChakraProvider>
  );
}

export default App;