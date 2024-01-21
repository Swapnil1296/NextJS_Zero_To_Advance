import React from "react";
import classes from "./page.module.css";
import { getMealBySlug } from "@/lib/meals";
import Image from "next/image";
import { notFound } from "next/navigation";

//localhost:3000/meals/something

// generating a dynamic metadata for each meal.
// function name should be only this generateMetadata else it will not work.
export async function generateMetadata({ params }) {
  const meal = getMealBySlug(params.mealSlug);
  if (!meal) {
    notFound();
  }
  console.log(meal.title);
  return {
    title: meal.title,
    description: meal.summary,
  };
}
const MealDetailPage = ({ params }) => {
  const meals = getMealBySlug(params.mealSlug);
  if (!meals) {
    notFound();
  }

  // comment the below line & see the difference on the UI .
  meals.instructions = meals.instructions.replace(/\n/g, "<br/>");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meals.image} alt={meals.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meals.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meals.creator_email}`}>{meals.creator}</a>
          </p>
          <p className={classes.summary}>{meals.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meals.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailPage;
