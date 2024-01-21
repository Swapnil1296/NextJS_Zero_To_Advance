import MealItem from "./MealsItem";
import classes from "./mealsgrid.module.css";
import { mealIcon } from "@/assets/icons/meal.png";

function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

export default MealsGrid;
