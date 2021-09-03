import { Box, Button, Center } from "@chakra-ui/react";
import classNames from "classnames";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Food from "../../model/Food";
import equateFood, { FoodFactorEquateField } from "../../services/equateFood";
import "./FoodComparationDelta.css"

type inputParams = {
    sourceFoodQuantity: number;

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

const FoodComparationDelta: React.FC<inputParams> = ({ sourceFoodQuantity, sourceFood, targetFood }) => {
    const [factor, setFactor] = useState(1);

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
            Target quantity: <Box as="span" fontSize="xl" fontWeight="bold" color="teal">{targetQuantity.toFixed(2)}</Box>
            <br></br>
            <br></br>
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
        </div>
    );
}

export default FoodComparationDelta;
