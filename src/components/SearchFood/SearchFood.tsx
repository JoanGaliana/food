import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormLabel, IconButton, Input, Select, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import FoodFacts from "../../model/FoodFacts";
import { SearchFoodResponse } from "../../model/SearchFoodResponse";
import SetState from "../../util/setState";
import FoodCard from "../FoodCard/FoodCard";
import Pagination from "../Pagination/Pagination";

type params = {
    setSourceFood: SetState<FoodFacts>;
    setTargetFood: SetState<FoodFacts>;
}

type FormData = {
    foodName: string;
    store: string;
    page: number;
}
export interface StoreData {
    id: string;
    known: number;
    name: string;
    products: number;
    url: string;
}

const SearchFood: React.FC<params> = ({ setSourceFood, setTargetFood }) => {
    const { register, handleSubmit, getValues, setValue } = useForm<FormData>();

    const [response, setResponse] = useState<SearchFoodResponse | null>(null);

    const [loading, setLoading] = useState(false);

    const [stores, setStores] = useState<StoreData[]>([{
        id: "",
        known: Number.MAX_VALUE,
        name: "",
        products: Number.MAX_VALUE,
        url: "",
    }]);

    useEffect(() => {
        fetch('/data/stores.json')
            .then(res => res.json())
            .then((res: { tags: StoreData[] }) => setStores(stores => [...stores, ...res.tags]));
    }, [])

    const fetchSearch = useCallback(() => {
        setLoading(true);
        setResponse(null);

        const queryString = new URLSearchParams(getValues() as unknown as Record<string, string>).toString();

        fetch(`/api/searchFood?${queryString}`)
            .then(res => res.json())
            .then((res: SearchFoodResponse) => setResponse(res))
            .finally(() => setLoading(false));
    }, [getValues])

    const onSubmit = handleSubmit(() => {
        setValue("page", 1);
        fetchSearch();
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <FormControl id="name" mt="3">
                    <FormLabel>Food name</FormLabel>
                    <Input {...register("foodName")} />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="store" mt="3">
                    <FormLabel>Store name</FormLabel>
                    <Select {...register("store")} >
                        {stores.sort((a, b) => b.products - a.products).map(store =>
                            <option key={store.id} value={store.id}>{store.name}</option>
                        )}
                    </Select>
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <IconButton mt="3"
                    colorScheme="blue"
                    aria-label="Search foods"
                    icon={<SearchIcon />}
                    type="submit"
                >Search</IconButton>
            </form>
            {loading ?
                <Box fontSize="3xl" fontWeight="bold">Loading...</Box>
                : ""
            }
            {response !== null ?
                <div>
                    <SimpleGrid columns={{ "sm": 1, "md": 3, "lg": 5, "xl": 6, }} spacing={2} my="5">
                        {response.foods.map(food =>
                            <FoodCard food={food} key={food.id}>
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
                        <Pagination currentPage={response.page} totalPages={response.page_count} onPageClick={(page) => {
                            setValue('page', page);
                            fetchSearch();
                        }} ></Pagination>
                    </div>
                </div> : ""
            }
        </div>
    );
}

export default SearchFood;
