import { Box, Button, Center, FormControl, FormLabel, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
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
    negative: n < 0,
    positive: n > 0,
})

const FoodComparationDelta: React.FC<inputParams> = ({ sourceFood, targetFood }) => {
    const [factor, setFactor] = useState(1);
    const [sourceFoodQuantity, setsourceFoodQuantity] = useState(100);

    const targetQuantity = sourceFoodQuantity * factor;

    const deltaValues = calcDelta(targetFood, targetQuantity, sourceFood, sourceFoodQuantity);

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
                <Box as="span" fontSize="2xl" fontWeight="bold" color="teal">{targetQuantity.toFixed(2)} g</Box> of {targetFood.name}
                <br />
                <small>Compared to {sourceFoodQuantity.toFixed(2)}g of {sourceFood.name}</small>
            </Box>

            <table>
                <thead>
                    <tr>
                        <th><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('kcal')}>Kcal</Button></th>

                        <th><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('protein')}>Protein</Button></th>
                        <th><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('carbs')}>Carbs</Button></th>
                        <th><Button colorScheme="blue" variant="ghost" onClick={getEquateByFn('fats')}>Fats</Button></th>
                    </tr>
                </thead>
                <tbody >

                    <tr >
                        <td className={classNames(getPositiveNegative(deltaValues.kcal))} >
                            <Center>{deltaValues.kcal.toFixed(2)}</Center>
                        </td>

                        <td className={classNames(getPositiveNegative(deltaValues.protein))}>
                            <Center>{deltaValues.protein.toFixed(2)}</Center>
                        </td>
                        <td className={classNames(getPositiveNegative(deltaValues.carbs))}>
                            <Center>{deltaValues.carbs.toFixed(2)}</Center>
                        </td>
                        <td className={classNames(getPositiveNegative(deltaValues.fats))}>
                            <Center>{deltaValues.fats.toFixed(2)}</Center>
                        </td>
                    </tr>

                </tbody>
            </table>
            <Box my="4">
                Factor: {factor.toFixed(2)}
            </Box>
            <FactorSlider setFactor={setFactor} factor={factor}></FactorSlider>
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