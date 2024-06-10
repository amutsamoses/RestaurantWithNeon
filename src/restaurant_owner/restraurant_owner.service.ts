import {
  TIRestaurantOwner,
  TSRestaurantOwner,
  RestaurantOwner,
} from "../drizzle/schema";

import { eq } from "drizzle-orm";
import db from "../drizzle/db";

// GET ALL RESTAURANT OWNERS
export const getRestaurantOwnerService = async (): Promise<TSRestaurantOwner[] | null> => {
  const restaurantOwner = await db.query.RestaurantOwner.findMany();
  return restaurantOwner;
};

// GET SINGLE RESTAURANT OWNER
export const getSingleRestaurantOwnerService = async (
  id: number
): Promise<TSRestaurantOwner | undefined> => {
  const restaurantOwner = await db.query.RestaurantOwner.findFirst({
    where: eq(RestaurantOwner.id, id),
  });
  return restaurantOwner;
};

// CREATE RESTAURANT OWNER
export const createRestaurantOwnerService = async (
  restaurantOwner: TIRestaurantOwner
) => {
  await db.insert(RestaurantOwner).values(restaurantOwner);
  return "Restaurant Owner created successfully";
};

//  UPDATE RESTAURANT OWNER
export const updateRestaurantOwnerService = async (
  id: number,
  restaurantOwner: TIRestaurantOwner
) => {
  await db.update(RestaurantOwner).set(restaurantOwner).where(eq(RestaurantOwner.id, id));
  return "Restaurant Owner updated successfully";
};

// DELETE RESTAURANT OWNER
export const deleteRestaurantOwnerService = async (id: number) => {
  await db.delete(RestaurantOwner).where(eq(RestaurantOwner.id, id));
  return "Restaurant Owner deleted successfully";
};