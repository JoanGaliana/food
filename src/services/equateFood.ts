import Food from "../model/Food";

type ByField = "kcal" | "protein";

const equateFood = (sourceFood: Food, targetFood: Food, byField: ByField = "kcal") => {
    return sourceFood[byField] / targetFood[byField];
}

export default equateFood;