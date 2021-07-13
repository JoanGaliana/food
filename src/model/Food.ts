export default interface Food {
    name: string;

    kcal: number;

    protein: number;
    fats: number;
    carbs: number;
}

export const createEmptyFood = (): Food => ({
    name: "",

    kcal: 0,
    
    protein: 0,
    carbs: 0,
    fats: 0,
})

