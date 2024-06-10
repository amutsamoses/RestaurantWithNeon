import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";

import {
  listCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller";

export const categoryRouter = new Hono();

//get all categories
categoryRouter.get("/categories", listCategories);

categoryRouter.get("/categories/:id", getSingleCategory);

categoryRouter.post(
  "/categories",
  zValidator("json", categorySchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createCategory
);

categoryRouter.put(
  "/categories/:id",
  zValidator("json", categorySchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateCategory
);

categoryRouter.delete("/categories/:id", deleteCategory);
