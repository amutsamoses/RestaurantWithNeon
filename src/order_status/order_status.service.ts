import { TIOrderStatus, TSOrderStatus, OrderStatus } from "../drizzle/schema";

import { eq } from "drizzle-orm";

import db from "../drizzle/db";

// GET ALL ORDER_STATUSS
export const getOrderStatusService = async (): Promise<
  TSOrderStatus[] | null
> => {
  const orderStatus = await db.query.OrderStatus.findMany();
  return orderStatus;
};

// GET SINGLE ORDER_STATUS
export const getSingleOrderStatusService = async (
  id: number
): Promise<TSOrderStatus | undefined> => {
  const orderStatus = await db.query.OrderStatus.findFirst({
    where: eq(OrderStatus.id, id),
  });
  return orderStatus;
};

// CREATE ORDER_STATUS
export const createOrderStatusService = async (orderStatus: TIOrderStatus) => {
  await db.insert(OrderStatus).values(orderStatus);
  return "OrderStatus created successfully";
};

//  UPDATE ORDER_STATUS
export const updateOrderStatusService = async (
  id: number,
  orderStatus: TIOrderStatus
) => {
  await db.update(OrderStatus).set(orderStatus).where(eq(OrderStatus.id, id));
  return "OrderStatus updated successfully";
};

// DELETE ORDER_STATUS
export const deleteOrderStatusService = async (id: number) => {
  await db.delete(OrderStatus).where(eq(OrderStatus.id, id));
  return "OrderStatus deleted successfully";
};
