import { Context } from "hono";

import {
  getRestaurantService,
  getSingleRestaurantService,
  createRestaurantService,
  updateRestaurantService,
  deleteRestaurantService,
} from "./restaurant.service";
import { Restaurant } from "../drizzle/schema";

export const listRestaurants = async (c: Context) => {
  const data = await getRestaurantService();
  if (data == null) {
    return c.text("No data found", 404);
  }
  return c.json(data, 200);
};

export const getSingleRestaurant = async (c: Context) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    return c.text("Invalid ID", 400);
  }

  const restaurant = await getSingleRestaurantService(id);
  if (restaurant == undefined) {
    return c.text("No data found", 404);
  }
  return c.json(restaurant, 200);
};

export const createRestaurant = async (c: Context) => {
  try {
    const restaurant = await c.req.json();
    const createRestaurant = await createRestaurantService(restaurant);

    if (!createRestaurant) {
      return c.text("Restaurant not created", 400);
    }
    return c.json({ msg: createRestaurant }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateRestaurant = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("invalid ID!", 400);
  }

  const user = await c.req.json();
  try {
    //search for user
    const foundRestaurant = await getSingleRestaurantService(id);
    if (foundRestaurant == undefined) return c.text("user not found!👽", 404);
    //get the data and update
    const res = await updateRestaurantService(id, user);
    //return the updated user
    if (!res) return c.text("user not updated!👽", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

//delete user
export const deleteRestaurant = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
  return c.text("invalid ID!", 400);

  try {
    //search for the user
    const restaurant = await getSingleRestaurantService(id);
    if (restaurant == undefined) 
    return c.text("user not found!👽", 404);
    //delete the user
    const res = await deleteRestaurantService(id);
    if (!res) return c.text("user not deleted!👽", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
