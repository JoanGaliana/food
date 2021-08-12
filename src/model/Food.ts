import FoodFacts, { createEmptyFoodFacts } from "./FoodFacts";

export default interface Food {
    id: string;

    name: string;

    foodFacts: FoodFacts;

    images: string[];

    brands: string[];
    stores: string[];

}

export const createEmptyFood = (): Food => ({
    id: "Empty",

    name: "-Empty-",

    foodFacts: createEmptyFoodFacts(),

    images: [],
    
    brands: [],
    stores: [],
})

