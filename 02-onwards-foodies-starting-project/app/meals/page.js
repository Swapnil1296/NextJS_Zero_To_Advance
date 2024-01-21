import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/MealsGrid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
export const metadata = {
  title: "All Meals",
  description:
    "Enjoy the Delicious Meals recipe shared by our vibrant community.",
};

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Recipe created{" "}
          <span className={classes.highlight}>by you</span>{" "}
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself , It is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share you favorite recipe</Link>
        </p>
      </header>
      <main>
        <Suspense
          fallback={
            <p className={classes.loading}>Fetching Foods for You ....</p>
          }
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default MealsPage;
