import React from "react";
import { useForm } from "react-hook-form";
import Food from "../../model/Food";
import SetState from "../../util/setState";

type inputParams = {
    food?: Food,
    setFood: SetState<Food>,
}
const FoodForm: React.FC<inputParams> = ({ food, setFood }) => {
    const { register, getValues, watch } = useForm<Food>({ defaultValues: food });

    watch(() => setFood(getValues()));

    return (
        <form>
            <label>
                <br></br>
                Name
                <input {...register("name")} />
            </label>

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
