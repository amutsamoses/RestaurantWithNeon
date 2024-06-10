import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";

import {
  listAddresses,
  getSingleAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from "./address.controller";

export const addressRouter = new Hono();

//get all addresses
addressRouter.get("/addresses", listAddresses);

addressRouter.get("/addresses/:id", getSingleAddress);

addressRouter.post(
  "/addresses",
  zValidator("json", addressSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createAddress
);

addressRouter.put(
  "/addresses/:id",
  zValidator("json", addressSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateAddress
);

addressRouter.delete("/addresses/:id", updateAddress);
