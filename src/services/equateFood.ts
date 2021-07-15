import FoodFacts from "../model/FoodFacts";

type ByField = "kcal" | "protein";

const equateFood = (sourceFood: FoodFacts, targetFood: FoodFacts, byField: ByField = "kcal") => {
    return sourceFood[byField] / targetFood[byField];
}

export default equateFood;