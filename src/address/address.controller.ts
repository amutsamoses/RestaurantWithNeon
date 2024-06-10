import { Context } from "hono";

import {
  getAddressService,
  getSingleAddressService,
  createAddressService,
  updateAddressService,
  deleteAddressService,
} from "./address.service";
import { undefined } from "zod";

export const listAddresses = async (c: Context) => {
  try {
    const address = await getAddressService();
    if (address == null || address.length == 0) {
      return c.text("No address found", 404);
    }
    return c.json(address, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleAddress = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const address = await getSingleAddressService(id);
    if (address == null) {
      return c.text("Address not found", 404);
    }
    return c.text("Address not found", 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const createAddress = async (c: Context) => {
  try {
    const address = await c.req.json();
    const result = await createAddressService(address);

    if (!result) {
      return c.text("Address not created", 400);
    }
    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const updateAddress = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    const address = await c.req.json();

    // search for user by id
    const updatedAddress = await getSingleAddressService(id);

    if (!updatedAddress === null) {
        return c.text("Address not found", 404);
    }

    // get data to update
    const res = await updateAddressService(id, address);
    return c.json({ message: res }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const deleteAddress = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.text("Invalid id", 400);
  }

  try {
    // search for address
    const address = await getSingleAddressService(id);
    if (!address) {
      return c.text("Address not found", 404);
    }

    // delete address
    const res = await deleteAddressService(id);

    return c.json({ message: res }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};
