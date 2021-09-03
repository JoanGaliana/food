import { VercelApiHandler } from '@vercel/node';
import fetch from "node-fetch";
import * as OpenfoodfactsAPI from './types/openFoodFactsAPI';
import Food from '../src/model/Food';

// &sort_by=unique_scans_n
const getFoodRequestURL = (foodName: string, page: string = "1", store: string) => {
    let reqString = `https://es.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${foodName}&page=${page}&page_size=12&json=true`

    if (store !== "") {
        reqString += `&tagtype_0=stores&tag_contains_0=contains&tag_0=${store}`
    }
    console.log({ reqString });

    return reqString;
}

const findFood: VercelApiHandler = async (req, res) => {
    const { foodName, page, store = "" } = req.query;


    const foodRes: OpenfoodfactsAPI.FindFoodResponse = await fetch(getFoodRequestURL(foodName.toString(), page.toString(), store.toString()))
        .then(foodRes => foodRes.json())

    res.json(mapOpenFoodsAPIResponse(foodRes));
}

const mapOpenFoodsAPIResponse = ({ count, page, products, page_count, page_size }: OpenfoodfactsAPI.FindFoodResponse) => ({
    count,
    page,
    page_count: Math.ceil(count / page_size),
    page_size,
    foods: products.map(mapOpenFoodsAPIProduct)
})

const mapOpenFoodsAPIProduct = (product: OpenfoodfactsAPI.Product): Food => ({
    id: product.id,

    name: product.product_name_es || product.product_name || product.generic_name_es || product.generic_name,

    foodFacts: {
        kcal: product.nutriments['energy-kcal_100g'] || 0,

        protein: product.nutriments.proteins_100g || 0,
        fats: product.nutriments.fat_100g || 0,
        carbs: product.nutriments.carbohydrates_100g || 0,
    },

    images: imagesArrayFromProduct(product),

    brands: product.brands_tags || [],
    stores: product.stores_tags || [],
})

const imagesArrayFromProduct = (product: OpenfoodfactsAPI.Product): string[] => [
    "image_front_url",
    'image_url',
    // 'image_front_small_url',
    // 'image_front_thumb_url',
    // 'image_ingredients_small_url',
    // 'image_ingredients_thumb_url',
    'image_ingredients_url',
    // 'image_nutrition_small_url',
    // 'image_nutrition_thumb_url',
    'image_nutrition_url',
    // 'image_small_url',
    // 'image_thumb_url',
].reduce((images, key) => {
    const value = String(product[key])

    if (value && value !== "") {
        images.push(value);
    }

    return images;
}, [] as string[])


export default findFood;