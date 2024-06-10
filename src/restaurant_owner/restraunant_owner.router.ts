import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";

import { restaurantOwnerSchema } from "../validators";

import {
  listRestaurantOwners,
  getSingleRestaurantOwner,
  createRestaurantOwner,
  updateRestaurantOwner,
  deleteRestaurantOwner,
} from "./restraurant_owner.controller";

export const restaurantOwnerRouter = new Hono();

//get all restaurantOwners
restaurantOwnerRouter.get("/restaurantOwners", listRestaurantOwners);

restaurantOwnerRouter.get("/restaurantOwners/:id", getSingleRestaurantOwner);

restaurantOwnerRouter.post(
  "/restaurantOwners",
  zValidator("json", restaurantOwnerSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createRestaurantOwner
);

restaurantOwnerRouter.put(
  "/restaurantOwners/:id",
  zValidator("json", restaurantOwnerSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateRestaurantOwner
);

restaurantOwnerRouter.delete("/restaurantOwners/:id", deleteRestaurantOwner);
