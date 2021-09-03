import { Box } from "@chakra-ui/react";
import classNames from "classnames";
import React from "react";
import Food from "../../model/Food";
import equateFood from "../../services/equateFood";
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
    const factor = sourceFood && targetFood ? equateFood(sourceFood?.foodFacts, targetFood?.foodFacts) : -1;

    const targetQuantity = sourceFoodQuantity * factor;

    const deltaValues = calcDelta(targetFood, targetQuantity, sourceFood, sourceFoodQuantity);

    return (
        <div>
            Target quantity: <Box as="span" fontSize="xl" fontWeight="bold" color="teal">{targetQuantity.toFixed(2)}</Box>
            <br></br>
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>Kcal</th>

                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fats</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={classNames(getPositiveNegative(deltaValues.kcal))}>
                            {deltaValues.kcal.toFixed(2)}
                        </td>

                        <td className={classNames(getPositiveNegative(deltaValues.protein))}>
                            {deltaValues.protein.toFixed(2)}
                        </td>
                        <td className={classNames(getPositiveNegative(deltaValues.carbs))}>
                            {deltaValues.carbs.toFixed(2)}
                        </td>
                        <td className={classNames(getPositiveNegative(deltaValues.fats))}>
                            {deltaValues.fats.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FoodComparationDelta;
