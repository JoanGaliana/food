import { Badge, Box, Flex, IconButton, Image } from "@chakra-ui/react";
import React from "react";
import Food from "../../model/Food";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { useContext } from "react";
import { FavoriteFoodsContext } from "../../pages/EquatePage";
import favoriteFoodsService from "../../services/favoriteFoodsService";

type params = {
    food: Food
}
const normalizeText = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).replaceAll('-', ' ');

const FoodCard: React.FC<params> = ({ food, children }) => {
    const { favoriteFoods, setFavoriteFoods } = useContext(FavoriteFoodsContext);

    return (
        <Box key={food.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Flex justifyContent="center" alignContent="center" h="10rem" backgroundColor="blue.800">
                <Image w="100" src={food.images[0]} alt={food.name} position="relative" />
            </Flex>
            <Box p="0.5rem" mt="0.5rem">
                <Flex alignItems="baseline" overflow="hidden" h="1.5rem">
                    {food.stores.map(normalizeText).map(store =>
                        <Badge key={store} ml="1" px={2} borderRadius="full" colorScheme="teal">{store}</Badge>
                    )}
                </Flex>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {food.name}
                    {favoriteFoodsService.isFavoriteFood(food.id, favoriteFoods) ?
                        <IconButton onClick={() => setFavoriteFoods(favoriteFoodsService.remove(food.id))} ml="1" variant="ghost" aria-label="Remove food from favorites" icon={<AiFillStar></AiFillStar>}></IconButton>
                        :
                        <IconButton onClick={() => setFavoriteFoods(favoriteFoodsService.add(food))} ml="1" variant="ghost" aria-label="Add food to favorites" icon={<AiOutlineStar></AiOutlineStar>}></IconButton>
                    }
                </Box>

                <Box>
                    {food.brands.map(normalizeText).join(", ")}
                </Box>
                <Box mt="3">
                    Food facts
                    <Box as="span" color="gray.600" fontSize="sm">/100g</Box>
                    <Box>
                        <Badge px="2" mr="2" borderRadius="full"> {food.foodFacts.kcal} Kcal</Badge>
                        <Badge px="2" borderRadius="full"> {(food.foodFacts.kcal / food.foodFacts.protein).toFixed(0)} Kcal/Protein</Badge>
                    </Box>
                    <Box>
                        <Badge px="2" mr="2" borderRadius="full"> {food.foodFacts.protein} Protein</Badge>
                        <Badge px="2" mr="2" borderRadius="full"> {food.foodFacts.carbs} Carbs</Badge>
                        <Badge px="2" borderRadius="full"> {food.foodFacts.fats} Fats</Badge>
                    </Box>
                </Box>
                <Flex mt="4" d="flex" alignItems="center">
                    {children}
                </Flex>

            </Box>
        </Box>
    );
}

export default FoodCard;
