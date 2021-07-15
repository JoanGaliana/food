import { Badge, Box, Image } from "@chakra-ui/react";
import React from "react";
import Food from "../../model/Food";

type params = {
    food: Food
}
const normalizeText = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).replaceAll('-', ' ');

const FoodCard: React.FC<params> = ({ food, children }) => {
    return (
        <Box key={food.id} maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image w="max-content" src={food.images[0]} alt={food.name} />

            <Box p="2">
                <Box d="flex" alignItems="baseline" overflow="hidden">
                    {food.stores.map(normalizeText).map(store =>
                        <Badge ml="1" px={2} borderRadius="full" colorScheme="teal">{store}</Badge>
                    )}
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {food.name}
                </Box>

                <Box>
                    {food.brands.map(normalizeText).join(", ")}
                </Box>
                <Box mt="3">
                    Food facts
                    <Box as="span" color="gray.600" fontSize="sm">/100g</Box>
                    <Box>
                        <Badge px="2" borderRadius="full"> {food.foodFacts.kcal} Kcal</Badge>
                    </Box>
                    <Box>
                        <Badge px="2" mr="2" borderRadius="full"> {food.foodFacts.protein} Protein</Badge>
                        <Badge px="2" mr="2" borderRadius="full"> {food.foodFacts.carbs} Carbs</Badge>
                        <Badge px="2" borderRadius="full"> {food.foodFacts.fats} Fats</Badge>
                    </Box>
                </Box>
                <Box mt="4" d="flex" alignItems="center">
                    {children}
                </Box>

            </Box>
        </Box>
    );
}

export default FoodCard;
