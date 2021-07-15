import { Box, Button, FormControl, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import FoodFacts from "../../model/FoodFacts";
import { SearchFoodResponse } from "../../model/SearchFoodResponse";
import SetState from "../../util/setState";
import FoodCard from "../FoodCard/FoodCard";

type params = {
    setSourceFood: SetState<FoodFacts>;
    setTargetFood: SetState<FoodFacts>;
}

type FormData = {
    foodName: string;
}

const SearchFood: React.FC<params> = ({ setSourceFood, setTargetFood }) => {
    const { register, handleSubmit, getValues } = useForm<FormData>();

    const [response, setResponse] = useState<SearchFoodResponse | null>(null);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchSearch = useCallback(
        () => {
            setLoading(true);
            setResponse(null);

            fetch(`/api/searchFood?foodName=${getValues().foodName}&page=${page}`)
                .then(res => res.json())
                .then((res: SearchFoodResponse) => setResponse(res))
                .finally(() => setLoading(false));
        }
        , [getValues, page]
    )

    const onSubmit = handleSubmit(formData => {

        setPage(1);

        fetchSearch();
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <FormControl id="name">
                    <FormLabel>Food name</FormLabel>
                    <Input {...register("foodName")} />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <Button type="submit">Search</Button>
            </form>
            {loading ?
                <Box fontSize="3xl" fontWeight="bold">Loading...</Box>
                : ""
            }
            {response !== null ?
                <div>
                    <SimpleGrid columns={{ "sm": 1, "md": 3, "lg": 5, "xl": 6,  }} spacing={2}>
                        {response.foods.map(food =>
                            <FoodCard food={food}>
                                <Button colorScheme="blue" mx={1} onClick={() => {
                                    setSourceFood(food.foodFacts);
                                }}>Set source food</Button>
                                <Button colorScheme="blue" mx={1} onClick={() => {
                                    setTargetFood(food.foodFacts);
                                }}>Set target food</Button>
                            </FoodCard>
                        )}
                    </SimpleGrid>
                    <div>
                        {generatePagesArray(response.page, response.page_count).map(page =>
                            <Button onClick={() => {
                                //TODO refactor
                                setPage(page);
                                fetchSearch();
                            }}>{page}</Button>
                        )}
                    </div>
                    <hr></hr>
                </div> : ""
            }
        </div>
    );
}
const generatePagesArray = (from: number, to: number) => Array.from({ length: (to - from) + 1 }, (_, i) => i + from)

export default SearchFood;
