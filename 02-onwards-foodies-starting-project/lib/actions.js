"use server";

import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

const InvalidInput = (text) => {
  return !text || text.trim() === "";
};

const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    InvalidInput(meal.title) ||
    InvalidInput(meal.summary) ||
    InvalidInput(meal.instructions) ||
    InvalidInput(meal.creator) ||
    InvalidInput(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "invalid Input..",
    };
  }
  await saveMeal(meal);
  // to revalidate all the pages of your website ;
  // revalidatePath('/', 'layout')
  // to revalidate only a single page of website ;
  revalidatePath("/meals");
  // to revalidate nested routes /pages
  // revalidatePath('/meals', 'layout')
  redirect("/meals");
};
export default shareMeal;
