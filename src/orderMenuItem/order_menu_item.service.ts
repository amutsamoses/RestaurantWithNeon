import {
  OrderMenuItem,
  TIOrderMenuItem,
  TSOrderMenuItem,
} from "../drizzle/schema";

import { eq } from "drizzle-orm";

import db from "../drizzle/db";

// GET ALL ORDER MENU ITEM
export const getOrderMenuItemService = async (): Promise<
  TSOrderMenuItem[] | null
> => {
  const orderMenuItem = await db.query.OrderMenuItem.findMany();
  return orderMenuItem;
};

// GET SINGLE ORDER MENU ITEM
export const getSingleOrderMenuItemService = async (
  id: number
): Promise<TSOrderMenuItem | undefined> => {
  const orderMenuItem = await db.query.OrderMenuItem.findFirst({
    where: eq(OrderMenuItem.id, id),
  });
  return orderMenuItem;
};

// CREATE ORDER MENU ITEM
export const createOrderMenuItemService = async (
  orderMenuItem: TIOrderMenuItem
) => {
  await db.insert(OrderMenuItem).values(orderMenuItem);
  return "Order Menu Item created successfully";
};

//  UPDATE ORDER MENU ITEM
export const updateOrderMenuItemService = async (
  id: number,
  orderMenuItem: TIOrderMenuItem
) => {
  await db
    .update(OrderMenuItem)
    .set(orderMenuItem)
    .where(eq(OrderMenuItem.id, id));
  return "Order Menu Item updated successfully";
};

// DELETE ORDER MENU ITEM
export const deleteOrderMenuItemService = async (id: number) => {
  await db.delete(OrderMenuItem).where(eq(OrderMenuItem.id, id));
  return "Order Menu Item deleted successfully";
};
