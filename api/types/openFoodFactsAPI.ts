export interface Product {
    id: string;

    generic_name: string;
    generic_name_es: string;

    product_name: string;
    product_name_es: string;

    product_quantity: string;
    quantity: string;

    image_front_small_url: string;
    image_front_thumb_url: string;
    image_front_url: string;
    image_ingredients_small_url: string;
    image_ingredients_thumb_url: string;
    image_ingredients_url: string;
    image_nutrition_small_url: string;
    image_nutrition_thumb_url: string;
    image_nutrition_url: string;
    image_small_url: string;
    image_thumb_url: string;
    image_url: string;

    brands: string;
    brands_tags: string[];

    nutriments: {
        carbohydrates_100g: number;
        "energy-kcal_100g": number;
        fat_100g: number;
        fiber_100g: number;
        proteins_100g: number;
        salt_100g: number;
        "saturated-fat_100g": number;
        sodium_100g: number;
        sugars_100g: number;
    }

    stores: string;
    stores_tags: string[];

    [key: string]: any;
}

export interface FindFoodResponse {
    count: number;
    page: number;
    page_count: number;
    page_size: number;

    skip: number;

    products: Product[];
}

