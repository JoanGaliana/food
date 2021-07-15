import Food from "./Food";

export interface SearchFoodResponse {
    count: number,
    page: number,
    page_count: number;
    page_size: number;
    foods: Food[],
}