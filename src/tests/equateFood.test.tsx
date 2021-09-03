import equateFood from "../services/equateFood";
import FoodFacts from "../model/FoodFacts";

const testFactors = {
    kcal: 2,
    protein: 3,
    carbs: 4,
    fats: 5,
}

describe('equate food', () => {
    let sourceFood: FoodFacts;
    let targetFood: FoodFacts;

    beforeEach(() => {
        sourceFood = {
            kcal: 100,

            protein: 200,
            carbs: 300,
            fats: 400,
        };

        targetFood = {
            kcal: sourceFood.kcal / testFactors.kcal,

            protein: sourceFood.protein / testFactors.protein,
            carbs: sourceFood.carbs / testFactors.carbs,
            fats: sourceFood.fats / testFactors.fats,
        };
    })

    test('by kcal default', () => {
        const expectedResult = 2;
        const actualResult = equateFood(sourceFood, targetFood);

        expect(actualResult).toEqual(expectedResult);
    });

    test('by kcal explicit', () => {
        const expectedResult = testFactors.kcal;
        const actualResult = equateFood(sourceFood, targetFood, "kcal");

        expect(actualResult).toEqual(expectedResult);
    });

    test('by protein', () => {
        const expectedResult = testFactors.protein;
        const actualResult = equateFood(sourceFood, targetFood, "protein");

        expect(actualResult).toEqual(expectedResult);
    });

    test('by carbs', () => {
        const expectedResult = testFactors.carbs;
        const actualResult = equateFood(sourceFood, targetFood, "carbs");

        expect(actualResult).toEqual(expectedResult);
    });

    test('by fats', () => {
        const expectedResult = testFactors.fats;
        const actualResult = equateFood(sourceFood, targetFood, "fats");

        expect(actualResult).toEqual(expectedResult);
    });
})

