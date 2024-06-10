import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema } from "../validators";

import {
  listStatusCatalog,
  getSingleStatusCatalog,
  createStatusCatalog,
  updateStatusCatalog,
  deleteStatusCatalog,
} from "./status_catalog.controller";

export const statusCatalogRouter = new Hono();

//get all status catalogs
statusCatalogRouter.get("/status_catalogs", listStatusCatalog);

statusCatalogRouter.get("/status_catalogs/:id", getSingleStatusCatalog);

statusCatalogRouter.post(
  "/status_catalogs",
  zValidator("json", statusCatalogSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createStatusCatalog
);

statusCatalogRouter.put(
  "/status_catalogs/:id",
  zValidator("json", statusCatalogSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateStatusCatalog
);

statusCatalogRouter.delete("/status_catalogs/:id", deleteStatusCatalog);
