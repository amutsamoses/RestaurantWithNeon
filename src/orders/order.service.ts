import { eq } from "drizzle-orm";

import db from "../drizzle/db";

import { Context } from "hono";

import { TSOrder, TIOrder, Orders } from "../drizzle/schema";

export const getOrderService = async (): Promise<TSOrder[]> => {
  return await db.query.Orders.findMany();
};

//get single restaurant
export const getSingleOrderService = async (
  id: number
): Promise<TIOrder | undefined> => {
  return await db.query.Orders.findFirst({
    where: eq(Orders.id, id),
  });
};

export const createOrderService = async (orders: TIOrder): Promise<TIOrder> => {
  await db.insert(Orders).values(orders);
  return orders;
};

export const updateOrderService = async (
  id: number,
  orders: TIOrder
): Promise<TIOrder> => {
  await db.update(Orders).set(orders).where(eq(Orders.id, id));
  return orders;
};

export const deleteOrderService = async (id: number) => {
  await db.delete(Orders).where(eq(Orders.id, id));
  return "Order deleted successfully";
};
