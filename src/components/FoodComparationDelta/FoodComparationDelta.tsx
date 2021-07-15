import classNames from "classnames";
import React, { useMemo } from "react";
import FoodFacts from "../../model/FoodFacts";

const calcDelta = (targetFood: FoodFacts, targetQuantity: number, sourceFood: FoodFacts, sourceFoodQuantity: number) => (
    {
        name: "",

        kcal: ((targetFood.kcal * targetQuantity) - (sourceFood.kcal * sourceFoodQuantity)) / 100,

        protein: ((targetFood.protein * targetQuantity) - (sourceFood.protein * sourceFoodQuantity)) / 100,
        carbs: ((targetFood.carbs * targetQuantity) - (sourceFood.carbs * sourceFoodQuantity)) / 100,
        fats: ((targetFood.fats * targetQuantity) - (sourceFood.fats * sourceFoodQuantity)) / 100,
    })

type inputParams = {
    factor: number;
    sourceFoodQuantity: number;

    sourceFood: FoodFacts;
    targetFood: FoodFacts;
}

const getPositiveNegative = (n: number) => ({
    negative: n < 0,
    positive: n > 0,
})

const FoodComparationDelta: React.FC<inputParams> = ({ sourceFoodQuantity, factor, sourceFood, targetFood }) => {
    const targetQuantity = useMemo(
        () => sourceFoodQuantity * factor,
        [sourceFoodQuantity, factor]
    );

    const deltaValues = useMemo(
        () => calcDelta(targetFood, targetQuantity, sourceFood, sourceFoodQuantity),
        [targetFood, targetQuantity, sourceFood, sourceFoodQuantity]
    );

    return (
        <div>
            Target quantity: {targetQuantity.toFixed(2)}
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


