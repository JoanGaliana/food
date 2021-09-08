import Food from "../model/Food";

const favoriteFoodsServices = {
    isFavoriteFood: (foodId: string, favoriteFoods: Food[]) => !!favoriteFoods.find(food => food.id === foodId),

    add: (food: Food) => {
        const foods = favoriteFoodsServices.readAll();

        if (!favoriteFoodsServices.isFavoriteFood(food.id, foods)) {
            foods.push(food);

            localStorage.setItem("favoriteFoods", JSON.stringify(foods));
        }

        return foods;
    },

    remove: (foodId: string) => {
        const filteredFoods = favoriteFoodsServices.readAll().filter(food => food.id !== foodId);

        localStorage.setItem("favoriteFoods", JSON.stringify(filteredFoods));

        return filteredFoods;
    },

    readAll: (): Food[] => JSON.parse(localStorage.getItem("favoriteFoods") || "[]") || [],
}

export default favoriteFoodsServices;