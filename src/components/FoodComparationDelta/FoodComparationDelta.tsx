import { Box, Button, Center, FormControl, FormLabel, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import classNames from "classnames";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Food from "../../model/Food";
import equateFood, { FoodFactorEquateField } from "../../services/equateFood";
import SetState from "../../util/setState";
import "./FoodComparationDelta.css"

type inputParams = {
    sourceFood: Food;
    targetFood: Food;
}

const calcDelta = ({ foodFacts: targetFoodFacts }: Food, targetQuantity: number, { foodFacts: sourceFoodFacts }: Food, sourceFoodQuantity: number) => (
    {
        name: "",

        kcal: ((targetFoodFacts.kcal * targetQuantity) - (sourceFoodFacts.kcal * sourceFoodQuantity)) / 100,

        protein: ((targetFoodFacts.protein * targetQuantity) - (sourceFoodFacts.protein * sourceFoodQuantity)) / 100,
        carbs: ((targetFoodFacts.carbs * targetQuantity) - (sourceFoodFacts.carbs * sourceFoodQuantity)) / 100,
        fats: ((targetFoodFacts.fats * targetQuantity) - (sourceFoodFacts.fats * sourceFoodQuantity)) / 100,
    })

const getPositiveNegative = (n: number) => ({
    //Avoid inconsistencies while rendering rounded number -0.001 becomes -0.0 
    negative: n < -0.009,
    positive: n > 0,
})

const formatDeltaValue = (n: number) => {
    let formattedValue = n === -0 ? "0" : n.toFixed(2);

    return n > 0 ? `+${formattedValue}` : formattedValue;
};

const FoodComparationDelta: React.FC<inputParams> = ({ sourceFood, targetFood }) => {
    const [factor, setFactor] = useState(1);
    const [sourceFoodQuantity, setsourceFoodQuantity] = useState(100);

    const targetFoodQuantity = sourceFoodQuantity * factor;

    const deltaValues = calcDelta(targetFood, targetFoodQuantity, sourceFood, sourceFoodQuantity);

    const getEquateByFn = useCallback(
        (factorName: FoodFactorEquateField) => () => setFactor(equateFood(sourceFood?.foodFacts, targetFood?.foodFacts, factorName)),
        [sourceFood?.foodFacts, targetFood?.foodFacts]
    );

    useEffect(
        () => {
            getEquateByFn("kcal")();
        }
        , [getEquateByFn]
    );

    return (
        <div>
            <FormControl id="name" mb="4">
                <FormLabel>Quantity of {sourceFood.name} (g)</FormLabel>
                <Input type="number" min="0" defaultValue="100" onChange={(e) => { setsourceFoodQuantity(Number.parseInt(e.target.value)) }} />
            </FormControl>

            <Box mb="1">
                <Box as="span" fontSize="2xl" fontWeight="bold" color="teal">{targetFoodQuantity.toFixed(2)} g</Box> of {targetFood.name}
                <br />
                <small>Compared to {sourceFoodQuantity.toFixed(2)}g of {sourceFood.name}</small>
            </Box>

            <Table>
                <Thead>
                    <Tr>
                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('kcal')}>ΔKcal</Button></Center></Th>

                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('protein')}>ΔProtein</Button></Center></Th>
                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('carbs')}>ΔCarbs</Button></Center></Th>
                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('fats')}>ΔFats</Button></Center></Th>
                    </Tr>
                </Thead>
                <Tbody >
                    <Tr >
                        <Td className={classNames(getPositiveNegative(deltaValues.kcal))} >
                            <Center>{formatDeltaValue(deltaValues.kcal)}</Center>
                        </Td>

                        <Td className={classNames(getPositiveNegative(deltaValues.protein))}>
                            <Center>{formatDeltaValue(deltaValues.protein)}</Center>
                        </Td>
                        <Td className={classNames(getPositiveNegative(deltaValues.carbs))}>
                            <Center>{formatDeltaValue(deltaValues.carbs)}</Center>
                        </Td>
                        <Td className={classNames(getPositiveNegative(deltaValues.fats))}>
                            <Center>{formatDeltaValue(deltaValues.fats)}</Center>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <Box my="4">
                Factor: {factor.toFixed(2)}
            </Box>
            <FactorSlider setFactor={setFactor} factor={factor}></FactorSlider>

            <Box></Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>

                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('kcal')}>ΔKcal</Button></Center></Th>

                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('protein')}>ΔProtein</Button></Center></Th>
                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('carbs')}>ΔCarbs</Button></Center></Th>
                        <Th><Center><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('fats')}>ΔFats</Button></Center></Th>
                    </Tr>
                </Thead>
                <Tbody >
                    <Tr >
                        <Td>{sourceFood.name}</Td>

                        <Td>
                            <Center>{(sourceFood.foodFacts.kcal * (sourceFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>

                        <Td>
                            <Center>{(sourceFood.foodFacts.protein * (sourceFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>
                        <Td>
                            <Center>{(sourceFood.foodFacts.carbs * (sourceFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>
                        <Td>
                            <Center>{(sourceFood.foodFacts.fats * (sourceFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>
                    </Tr>

                    <Tr >
                        <Td>{targetFood.name}</Td>

                        <Td>
                            <Center>{(targetFood.foodFacts.kcal * (targetFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>

                        <Td>
                            <Center>{(targetFood.foodFacts.protein * (targetFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>
                        <Td>
                            <Center>{(targetFood.foodFacts.carbs * (targetFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>
                        <Td>
                            <Center>{(targetFood.foodFacts.fats * (targetFoodQuantity / 100)).toFixed(2)}</Center>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    );
}

function FactorSlider({ setFactor, factor }: { setFactor: SetState<number>, factor: number }) {
    return <Slider
        aria-label="slider-factor"
        min={0.1} step={0.05} max={10}
        onChange={(value) => setFactor(value)} value={factor}
    >
        <SliderTrack>
            <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
    </Slider>;
}

export default FoodComparationDelta;