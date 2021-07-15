import FoodFacts from "./FoodFacts";

export default interface Food {
    id: string;

    name: string;

    foodFacts: FoodFacts;

    images: string[];

    brands: string[];
    stores: string[];

}

export const createEmptyFood = (): FoodFacts => ({
    // name: "",

    kcal: 0,

    protein: 0,
    carbs: 0,
    fats: 0,
})

