import { Fragment, useMemo, useState } from 'react';
import './App.css';
import FoodComparationDelta from './components/FoodComparationDelta/FoodComparationDelta';
import FoodForm from './components/FoodForm/FoodForm';
import Food, { createEmptyFood } from './model/Food';
import equateFood from './services/equateFood';

function App() {
  const [baseFood, setBaseFood] = useState<Food>(createEmptyFood());
  const [targetFood, setTargetFood] = useState<Food>(createEmptyFood());

  const [baseQuantity, setBaseQuantity] = useState(0);

  const factor = useMemo(() => equateFood(baseFood, targetFood), [baseFood, targetFood]);

  return (
    <Fragment>
      <h3>Base Food</h3>
      <label>
        Base quantity (g)

        <input type="number" min="0" onChange={(e) => { setBaseQuantity(Number.parseInt(e.target.value)) }}></input>
      </label>
      <FoodForm food={baseFood} setFood={setBaseFood}></FoodForm>
      <hr></hr>

      <h3>Target Food</h3>
      <FoodForm food={targetFood} setFood={setTargetFood}></FoodForm>

      <hr></hr>

      <h3>Result</h3>
      Factor: {factor.toFixed(2)}


      <FoodComparationDelta
        factor={factor}
        sourceFoodQuantity={baseQuantity}

        sourceFood={baseFood}
        targetFood={targetFood}
      ></FoodComparationDelta>

    </Fragment>
  );
}

export default App;
