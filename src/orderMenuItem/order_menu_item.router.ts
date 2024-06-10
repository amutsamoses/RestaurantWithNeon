import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";

import { orderMenuItemSchema } from "../validators";

import {
  listOrderMenuItems,
  getSingleOrderMenuItem,
  createOrderMenuItem,
  updateOrderMenuItem,
  deleteOrderMenuItem,
} from "./order_menu_item.controller";

export const orderMenuItemRouter = new Hono();

//get all order menu items
orderMenuItemRouter.get("/order_menu_items", listOrderMenuItems);

orderMenuItemRouter.get("/order_menu_items/:id", getSingleOrderMenuItem);

orderMenuItemRouter.post(
  "/order_menu_items",
  zValidator("json", orderMenuItemSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createOrderMenuItem
);

orderMenuItemRouter.put(
  "/order_menu_items/:id",
  zValidator("json", orderMenuItemSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateOrderMenuItem
);

orderMenuItemRouter.delete("/order_menu_items/:id", deleteOrderMenuItem);
