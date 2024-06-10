import { TICategory, TSCategory, Category } from "../drizzle/schema";

import db from "../drizzle/db";

import { eq } from "drizzle-orm";

// GET ALL CATEGORIES
export const getCategoryService = async (): Promise<TSCategory[] | null> => {
  const category = await db.query.Category.findMany();
  return category;
};

// GET SINGLE CATEGORY
export const getSingleCategoryService = async (
  id: number
): Promise<TSCategory | undefined> => {
  const category = await db.query.Category.findFirst({
    where: eq(Category.id, id),
  });
  return category;
};

// CREATE CATEGORY
export const createCategoryService = async (category: TICategory) => {
  await db.insert(Category).values(category);
  return "Category created successfully";
};

//  UPDATE CATEGORY
export const updateCategoryService = async (id: number, category: TICategory) => {
  await db.update(Category).set(category).where(eq(Category.id, id));
  return "Category updated successfully";
};

// DELETE CATEGORY
export const deleteCategoryService = async (id: number) => {
  await db.delete(Category).where(eq(Category.id, id));
  return "Category deleted successfully";
};