import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error("Loading the page");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealBySlug(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug=?").get(slug);
}

export async function saveMeal(meal) {
  // creating a unique slug for the uploaded data using slugify
  meal.slug = slugify(meal.title, { lower: true });
  // avoiding attack by clearing out instruction using xss pkg.
  meal.instructions = xss(meal.instructions);

  // getting extension of image from the uploaded image
  const extension = meal.image.name.split(".").pop();
  // creating a unique name for the image.
  const fileName = `${meal.slug}.${extension}`;
  // storing the image in public folder using the fs method of node js.
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image is failed !");
    }
  });
  meal.image = `/images/${fileName}`;
  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions , creator, creator_email, image, slug)
  VALUES ( 
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
         @slug
         )
  `
  ).run(meal);
}
