import { SearchIcon } from "@chakra-ui/icons";
import { MdSwapHoriz } from "react-icons/md"
import { Box, SimpleGrid, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import FoodComparationDelta from "../components/FoodComparationDelta/FoodComparationDelta";
import SearchFoodModal from "../components/SearchFoodModal/SearchFoodModal";
import Food from "../model/Food";
import favoriteFoodsServices from "../services/favoriteFoodsService";
import SetState from "../util/setState";

type FavoriteFoodsContextType = {
    favoriteFoods: Food[],
    setFavoriteFoods: SetState<Food[]>
}

export const FavoriteFoodsContext = React.createContext<FavoriteFoodsContextType>({ favoriteFoods: [], setFavoriteFoods: () => { } });

const EquatePage: React.FC = () => {
    const [sourceFood, setSourceFood] = useState<Food | null>(null);
    const [targetFood, setTargetFood] = useState<Food | null>(null);

    const targetFoodDisclousure = useDisclosure();
    const sourceFoodDisclousure = useDisclosure();

    const [favoriteFoods, setFavoriteFoods] = useState(favoriteFoodsServices.readAll());

    return (
        <FavoriteFoodsContext.Provider value={{ favoriteFoods, setFavoriteFoods }}>
            <Box px="3rem" pt="1rem">
                <Box fontSize="3xl" fontWeight="semibold" mb="2rem">Food comparer</Box>
                <SimpleGrid columns={{ "sm": 1, "md": 2 }} >
                    <Box>
                        <Box fontSize="xl" fontWeight="semibold" mb="0.75rem">
                            Original food
                            <Button ml="0.5rem" colorScheme={sourceFood ? "gray" : "blue"} aria-label="Search foods" onClick={sourceFoodDisclousure.onOpen} leftIcon={<SearchIcon />}>Search</Button>
                        </Box>
                        {sourceFood && <FoodCard food={sourceFood}></FoodCard>}
                    </Box>
                    <SearchFoodModal
                        onClose={sourceFoodDisclousure.onClose}
                        isOpen={sourceFoodDisclousure.isOpen}
                        selectFoodButtonText="Select source food"
                        selectFood={setSourceFood}>
                    </SearchFoodModal>

                    <Box>
                        <Box fontSize="xl" fontWeight="semibold" mb="0.75rem">
                            Compared food
                            <Button ml="0.5rem" colorScheme={targetFood ? "gray" : "blue"} aria-label="Search foods" onClick={targetFoodDisclousure.onOpen} leftIcon={<SearchIcon />}>Search</Button>
                        </Box>
                        {targetFood && <FoodCard food={targetFood}></FoodCard>}
                    </Box>
                    <SearchFoodModal
                        onClose={targetFoodDisclousure.onClose}
                        isOpen={targetFoodDisclousure.isOpen}
                        selectFoodButtonText="Select target food"
                        selectFood={setTargetFood}>
                    </SearchFoodModal>
                </SimpleGrid>

                {targetFood && sourceFood &&
                    <React.Fragment>
                        <Button my="1rem" onClick={() => {
                            const aux = targetFood;

                            setTargetFood(sourceFood);
                            setSourceFood(aux);
                        }}
                            leftIcon={<MdSwapHoriz></MdSwapHoriz>}
                        >Swap foods</Button>

                        <FoodComparationDelta
                            sourceFood={sourceFood}
                            targetFood={targetFood}
                        ></FoodComparationDelta>
                    </React.Fragment>
                }
            </Box>
        </FavoriteFoodsContext.Provider>
    )
}

export default EquatePage;