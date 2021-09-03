import FoodFacts from "../model/FoodFacts";

export type FoodFactorEquateField = "kcal" | "protein" | "carbs" | "fats";

const equateFood = (sourceFood: FoodFacts, targetFood: FoodFacts, byField: FoodFactorEquateField = "kcal") => {
    return sourceFood[byField] / targetFood[byField];
}

export default equateFood;