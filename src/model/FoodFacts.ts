export default interface FoodFacts {
    kcal: number;

    protein: number;
    fats: number;
    carbs: number;
}

export const createEmptyFoodFacts = (): FoodFacts => ({
    kcal: 0,
    
    protein: 0,
    carbs: 0,
    fats: 0,
})

