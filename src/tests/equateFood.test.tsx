import equateFood from "../services/equateFood";
import FoodFacts from "../model/FoodFacts";

describe('equate food', () => {
    let sourceFood: FoodFacts;
    let targetFood: FoodFacts;

    beforeEach(() => {
        sourceFood = {
            name: "Brocoli",

            kcal: 100,

            protein: 200,
            carbs: 300, 
            fats: 400,
        };

        targetFood = {
            name: "Rice",

            kcal: sourceFood.kcal / 2,

            protein: sourceFood.protein / 3,
            carbs: sourceFood.carbs / 4,
            fats: sourceFood.fats / 5,
        };
    })

    test('by kcal default', () => {
        const expectedResult = 2;
        const actualResult = equateFood(sourceFood, targetFood);

        expect(actualResult).toEqual(expectedResult);
    });

    test('by kcal explicit', () => {
        const expectedResult = 2;
        const actualResult = equateFood(sourceFood, targetFood, "kcal");

        expect(actualResult).toEqual(expectedResult);
    });

    test('by protein', () => {
        const expectedResult = 3;
        const actualResult = equateFood(sourceFood, targetFood, "protein");

        expect(actualResult).toEqual(expectedResult);
    });
})

