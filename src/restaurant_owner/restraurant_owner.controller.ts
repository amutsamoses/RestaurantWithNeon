import { Context } from "hono";

import {
  getRestaurantOwnerService,
  getSingleRestaurantOwnerService,
  createRestaurantOwnerService,
  updateRestaurantOwnerService,
  deleteRestaurantOwnerService,
} from "./restraurant_owner.service";

export const listRestaurantOwners = async (c: Context) => {
  try {
    const restaurantOwner = await getRestaurantOwnerService();
    if (restaurantOwner == null || restaurantOwner.length == 0) {
      return c.text("No restaurantOwner found", 404);
    }
    return c.json(restaurantOwner, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleRestaurantOwner = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const restaurantOwner = await getSingleRestaurantOwnerService(id);
    if (restaurantOwner == null) {
      return c.text("Restaurant Owner not found", 404);
    }
    return c.json(restaurantOwner, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const createRestaurantOwner = async (c: Context) => {
  try {
    const restaurantOwner = await c.req.json();
    const result = await createRestaurantOwnerService(restaurantOwner);

    if (!result) {
      return c.text("Restaurant Owner not created", 400);
    }
    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const updateRestaurantOwner = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }

    const restaurant_owner = await c.req.json();

    // search for user by id
    const restaurantOwnerExists = await getSingleRestaurantOwnerService(id);

    if (!restaurantOwnerExists == null) {
      return c.text("Restaurant Owner not found", 404);
    }

    // get data to update
    const result = await updateRestaurantOwnerService(id, restaurant_owner);

    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const deleteRestaurantOwner = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("Invalid id", 400);
  }

  try {
    const restaurant_owner = await deleteRestaurantOwnerService(id);

    if (!restaurant_owner) {
      return c.text("Restaurant Owner not found", 404);
    }

    const result = await deleteRestaurantOwnerService(id);

    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};
