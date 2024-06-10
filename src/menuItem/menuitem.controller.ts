import { Context } from "hono";

import {
  getMenuItemService,
  getSingleMenuItemService,
  createMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
} from "./menuitem.service";
import { undefined } from "zod";

export const listMenuItems = async (c: Context) => {
  try {
    const menuItem = await getMenuItemService();
    if (menuItem == null || menuItem.length == 0) {
      return c.text("No menuItem found", 404);
    }
    return c.json(menuItem, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleMenuItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const menuItem = await getSingleMenuItemService(id);
    if (menuItem == null) {
      return c.text("MenuItem not found", 404);
    }
    return c.json(menuItem, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const createMenuItem = async (c: Context) => {
  try {
    const menuItem = await c.req.json();
    const result = await createMenuItemService(menuItem);

    if (!result) {
      return c.text("MenuItem not created", 400);
    }
    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const updateMenuItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    const menuItem = await c.req.json();

    // search for user by id
    const menuItemExist = await getSingleMenuItemService(id);
    if (!menuItemExist == null) {
      return c.text("MenuItem not found", 404);
    }

    const result = await updateMenuItemService(id, menuItem);
    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const deleteMenuItem = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("Invalid id", 400);
  }

  try {
    const menuItem = await getSingleMenuItemService(id);
    if (!menuItem) {
      return c.text("MenuItem not found", 404);
    }
    const result = await deleteMenuItemService(id);

    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};
