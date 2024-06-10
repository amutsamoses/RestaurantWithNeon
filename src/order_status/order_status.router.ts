import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { orderStatusSchema } from "../validators";

import {
  listOrderStatuses,
  getSingleOrderStatus,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
} from "./order_status.controller";

export const orderStatusRouter = new Hono();

//get all orderStatuses
orderStatusRouter.get("/orderStatuses", listOrderStatuses);

orderStatusRouter.get("/orderStatuses/:id", getSingleOrderStatus);

orderStatusRouter.post(
  "/orderStatuses",
  zValidator("json", orderStatusSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createOrderStatus
);

orderStatusRouter.put(
  "/orderStatuses/:id",
  zValidator("json", orderStatusSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateOrderStatus
);

orderStatusRouter.delete("/orderStatuses/:id", deleteOrderStatus);
