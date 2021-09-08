import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormLabel, IconButton, Input, Select, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Food from "../../model/Food";
import { SearchFoodResponse } from "../../model/SearchFoodResponse";
import { FavoriteFoodsContext } from "../../pages/EquatePage";
import FoodCard from "../FoodCard/FoodCard";
import Pagination from "../Pagination/Pagination";

type params = {
    onFoodSelect: (food: Food) => void;

    title?: string;
    buttonText?: string;
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

const SearchFood: React.FC<params> = ({ onFoodSelect, title = "Search food", buttonText = "Select" }) => {
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

    const { favoriteFoods } = useContext(FavoriteFoodsContext);

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
        <Tabs>
            <TabList>
                <Tab>Search</Tab>
                <Tab>Favorites</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
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
                    {loading && <Box fontSize="3xl" fontWeight="bold">Loading...</Box>}

                    {response &&
                        <div>
                            {response.foods.length === 0 &&
                                <Box mt="2rem" fontSize="2xl" fontWeight="bold"> No results found</Box>
                            }

                            {SelectFoodsGrid(response.foods, onFoodSelect, buttonText)}
                            <div>
                                <Pagination currentPage={response.page} totalPages={response.page_count} onPageClick={(page) => {
                                    setValue('page', page);
                                    fetchSearch();
                                }} ></Pagination>
                            </div>
                        </div>
                    }
                </TabPanel>
                <TabPanel>
                    {SelectFoodsGrid(favoriteFoods, onFoodSelect, buttonText)}
                </TabPanel>
            </TabPanels>
        </Tabs>

    );
}

function SelectFoodsGrid(foods: Food[], onFoodSelect: (food: Food) => void, buttonText: string) {
    return <SimpleGrid columns={{ "sm": 1, "md": 3, "lg": 5, "xl": 6, }} spacing={2} my="5">
        {foods.map(food => <FoodCard food={food} key={food.id}>
            <Button colorScheme="blue" mx={1} onClick={() => {
                onFoodSelect(food);
            }}>{buttonText}</Button>
        </FoodCard>
        )}
    </SimpleGrid>;
}

export default SearchFood;