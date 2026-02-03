import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const MealForm = () => {
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted meal name:", mealName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="meal-name">Meal Name : </label>
      <input
        id="meal-name"
        name="mealName"
        type="text"
        value={mealName}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setMealName(event.target.value)
        }
        placeholder="Enter a meal name"
      />
      <label htmlFor="meal-type">Meal Type : </label>
      <select
        id="meal-type"
        name="mealType"
        value={mealType}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setMealType(event.target.value)
        }
      >
        <option value="">Select a meal type</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MealForm;
