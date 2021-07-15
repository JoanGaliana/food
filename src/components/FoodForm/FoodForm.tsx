import React from "react";
// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FoodFacts from "../../model/FoodFacts";
import SetState from "../../util/setState";

type inputParams = {
    food?: FoodFacts,
    setFood: SetState<FoodFacts>,
}
const FoodForm: React.FC<inputParams> = ({ food, setFood }) => {
    const { register, getValues, watch } = useForm<FoodFacts>({ defaultValues: food });

    watch(() => setFood(getValues()));

    // useEffect(() => {
    //     if (food) {
    //         setValue("kcal", food.kcal);

    //         setValue("protein", food.protein);
    //         setValue("fats", food.fats);
    //         setValue("carbs", food.carbs);
    //     }
    // }, [food, setValue]);

    return (
        <form>
            {/* <label>
                <br></br>
                Name
                <input {...register("name")} />
            </label> */}

            <label>
                <br></br>
                kcal/100g
                <input defaultValue="0" {...register("kcal", { min: 0 })} />
            </label>

            <label>
                <br></br>
                Protein/100g
                <input defaultValue="0" {...register("protein", { min: 0 })} />
            </label>
            <label>
                <br></br>
                Fats/100g
                <input defaultValue="0" {...register("fats", { min: 0 })} />
            </label>
            <label>
                <br></br>
                Carbs/100g
                <input defaultValue="0" {...register("carbs", { min: 0 })} />
            </label>
            {/* <input type="submit" /> */}
        </form>
    );
}

export default FoodForm;
