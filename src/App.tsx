import { useCallback, useMemo, useState } from 'react';
import { ChakraProvider, FormControl, FormLabel, Input, Box, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, IconButton } from '@chakra-ui/react';
import './App.css';
import FoodComparationDelta from './components/FoodComparationDelta/FoodComparationDelta';
import SearchFood from './components/SearchFood/SearchFood';
import equateFood from './services/equateFood';
import FoodCard from './components/FoodCard/FoodCard';
import Food from './model/Food';
import { SearchIcon } from '@chakra-ui/icons';

function App() {
  const [sourceFood, setSourceFood] = useState<Food | null>(null);
  const [targetFood, setTargetFood] = useState<Food | null>(null);

  const [findFoodTarget, setFindFoodTarget] = useState<"SOURCE" | "TARGET">("SOURCE")

  const selectFood = useCallback((food: Food) => {
    const setFood = findFoodTarget === "TARGET" ? setTargetFood : setSourceFood;

    setFood(food);
  }, [findFoodTarget]);


  const [baseQuantity, setBaseQuantity] = useState(100);

  const factor = useMemo(() => sourceFood && targetFood ? equateFood(sourceFood?.foodFacts, targetFood?.foodFacts) : -1, [sourceFood, targetFood]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectFoodButtonText = useMemo(() => findFoodTarget === "TARGET" ? "Set target food" : "Set source food", [findFoodTarget]);
  return (
    <ChakraProvider>
      <Box px="3rem" pt="1rem">
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent my={0}>
            <ModalCloseButton />
            <ModalHeader>Search Food</ModalHeader>
            <ModalBody>
              <SearchFood
                onFoodSelect={(food) => {
                  selectFood(food);
                  onClose();
                }}
                buttonText={selectFoodButtonText}
              ></SearchFood>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} colorScheme="red">Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <SimpleGrid columns={{ "sm": 1, "md": 2 }} mb="2rem">
          <Box>
            <Box fontSize="xl" fontWeight="semibold" mb="0.75rem">
              Source food
              <IconButton ml="0.5rem" colorScheme={sourceFood ? "gray" : "blue"} aria-label="Search foods" onClick={() => {
                setFindFoodTarget("SOURCE");
                onOpen();
              }} icon={<SearchIcon />}></IconButton>
            </Box>
            {sourceFood ? <FoodCard food={sourceFood}></FoodCard> : ""}
          </Box>

          <Box>
            <Box fontSize="xl" fontWeight="semibold" mb="0.75rem">
              Target food
              <IconButton ml="0.5rem" colorScheme={targetFood ? "gray" : "blue"} aria-label="Search foods" onClick={() => {
                setFindFoodTarget("TARGET");
                onOpen();
              }} icon={<SearchIcon />}></IconButton>
            </Box>
            {targetFood ? <FoodCard food={targetFood}></FoodCard> : ""}
          </Box>
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
