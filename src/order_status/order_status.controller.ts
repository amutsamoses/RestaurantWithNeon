import { Context } from "hono";

import {
  getOrderStatusService,
  getSingleOrderStatusService,
  createOrderStatusService,
  updateOrderStatusService,
  deleteOrderStatusService,
} from "./order_status.service";

export const listOrderStatuses = async (c: Context) => {
  try {
    const orderStatus = await getOrderStatusService();
    if (orderStatus == null || orderStatus.length == 0) {
      return c.text("No orderStatus found", 404);
    }
    return c.json(orderStatus, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleOrderStatus = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const orderStatus = await getSingleOrderStatusService(id);
    if (orderStatus == null) {
      return c.text("OrderStatus not found", 404);
    }
    return c.json(orderStatus, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const createOrderStatus = async (c: Context) => {
  try {
    const orderStatus = await c.req.json();
    const result = await createOrderStatusService(orderStatus);

    if (!result) {
      return c.text("OrderStatus not created", 400);
    }
    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const updateOrderStatus = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }

    const orderStatus = await c.req.json();

    const orderStatusExists = await getSingleOrderStatusService(id);

    if (!orderStatusExists) {
      return c.text("OrderStatus does not exist", 404);
    }

    // search for user by id
    const result = await updateOrderStatusService(id, orderStatus);
    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const deleteOrderStatus = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("Invalid id", 400);
  }

  try {
    const orderStatus = await getSingleOrderStatusService(id);
    if (!orderStatus) {
      return c.text("OrderStatus not found", 404);
    }

    const result = await deleteOrderStatusService(id);
    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};
