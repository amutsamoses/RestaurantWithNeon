import { Context } from "hono";

import {
  getSingleStatusCatalogService,
  getStatusCatalogService,
  createStatusCatalogService,
  updateStatusCatalogService,
  deleteStatusCatalogService,
} from "./status_catalog.service";

export const listStatusCatalog = async (c: Context) => {
  try {
    const statusCatalog = await getStatusCatalogService();
    if (statusCatalog == null || statusCatalog.length == 0) {
      return c.text("No status catalog found", 404);
    }
    return c.json(statusCatalog, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleStatusCatalog = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const statusCatalog = await getSingleStatusCatalogService(id);
    if (statusCatalog == null) {
      return c.text("Status Catalog not found", 404);
    }
    return c.json(statusCatalog, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const createStatusCatalog = async (c: Context) => {
  try {
    const statusCatalog = await c.req.json();
    const result = await createStatusCatalogService(statusCatalog);

    if (!result) {
      return c.text("Status Catalog not created", 400);
    }
    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const updateStatusCatalog = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }

    const statusCatalog = await c.req.json();

    // search for user by id
    const statusCatalogFound = await getSingleStatusCatalogService(id);
    if (!statusCatalogFound == null) {
      return c.text("Status Catalog not found", 404);
    }

    const result = await updateStatusCatalogService(id, statusCatalog);
    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const deleteStatusCatalog = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("Invalid id", 400);
  }

  try {
    // search for status catalog
    const statusCatalog = await getSingleStatusCatalogService(id);
    if (!statusCatalog) {
      return c.text("Status Catalog not found", 404);
    }

    const result = await deleteStatusCatalogService(id);
    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};
