import { Context } from "hono";

import {
  getCategoryService,
  getSingleCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "./category.service";

import { undefined } from "zod";

export const listCategories = async (c: Context) => {
  try {
    const category = await getCategoryService();
    if (category == null || category.length == 0) {
      return c.text("No category found", 404);
    }
    return c.json(category, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleCategory = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const category = await getSingleCategoryService(id);
    if (category == null) {
      return c.text("Category not found", 404);
    }
    return c.json(category, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const createCategory = async (c: Context) => {
  try {
    const category = await c.req.json();
    const result = await createCategoryService(category);

    if (!result) {
      return c.text("Category not created", 400);
    }
    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const updateCategory = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    const category = await c.req.json();

    // search for user by id
    const categoryExist = await getSingleCategoryService(id);

    if (!categoryExist == null) {
      return c.text("Category not found", 404);
    }

    const result = await updateCategoryService(id, category);

    return c.json({ message: result }, 200);

  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const deleteCategory = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("Invalid id", 400);
  }

  try {
    // search for category
    const category = await getSingleCategoryService(id);
    if (!category) {
      return c.text("Category not found", 404);
    }

    const result = await deleteCategoryService(id);
    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};
