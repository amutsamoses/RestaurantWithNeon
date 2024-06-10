import { eq } from "drizzle-orm";

import db from "../drizzle/db";

import { Context } from "hono";

import { TSRestaurant, TIRestaurant, Restaurant } from "../drizzle/schema";

export const getRestaurantService = async (
): Promise<TSRestaurant[]> => {
  return await db.query.Restaurant.findMany();
};

//get single restaurant
export const getSingleRestaurantService = async (
  id: number
): Promise<TIRestaurant | undefined> => {
  return await db.query.Restaurant.findFirst({
    where: eq(Restaurant.id, id),
  });
};

export const createRestaurantService = async (
  restaurant: TIRestaurant
): Promise<TIRestaurant> => {
  await db.insert(Restaurant).values(restaurant);
  return restaurant;
};

export const updateRestaurantService = async (
  id: number,
  restaurant: TIRestaurant
): Promise<TIRestaurant> => {
  await db.update(Restaurant).set(restaurant).where(eq(Restaurant.id, id));
  return restaurant;
};

export const deleteRestaurantService = async (id: number) => {
  await db.delete(Restaurant).where(eq(Restaurant.id, id));
  return "Restaurant deleted successfully";
};
