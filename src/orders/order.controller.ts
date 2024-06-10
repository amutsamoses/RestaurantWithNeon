import { Context } from "hono";

import {
  createOrderService,
  deleteOrderService,
  getSingleOrderService,
  getOrderService,
  updateOrderService,
} from "./order.service";
import { Orders } from "../drizzle/schema";

export const listOrders = async (c: Context) => {
  const data = await getOrderService();
  if (data == null) {
    return c.text("No data found", 404);
  }
  return c.json(data, 200);
};

export const getSingleOrder = async (c: Context) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    return c.text("Invalid ID", 400);
  }

  const order = await getSingleOrderService(id);
  if (order == undefined) {
    return c.text("No data found", 404);
  }
  return c.json(order, 200);
};

export const createOrder = async (c: Context) => {
  try {
    const order = await c.req.json();
    const createOrder = await createOrderService(order);

    if (!createOrder) {
      return c.text("Order not created", 400);
    }
    return c.json({ msg: createOrder }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateOrder = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("invalid ID!", 400);
  }

  const user = await c.req.json();
  try {
    //search for user
    const foundOrder = await getSingleOrderService(id);
    if (foundOrder == undefined) return c.text("user not found!👽", 404);
    //get the data and update
    const res = await updateOrderService(id, user);
    //return the updated user
    if (!res) return c.text("user not updated!👽", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

//delete user
export const deleteOrder = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("invalid ID!", 400);

  try {
    //search for the user
    const order = await getSingleOrderService(id);
    if (order == undefined) return c.text("user not found!👽", 404);
    //delete the user
    const res = await deleteOrderService(id);
    if (!res) return c.text("user not deleted!👽", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
