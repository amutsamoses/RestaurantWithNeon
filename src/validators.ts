import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string(),
  street_address: z.string(),
  city_id: z.number(),
  zip_code: z.number(),
});

export const userSchema = z.object({
  name: z.string().max(255),
  contact_phone: z.string().max(20).optional().nullable(),
  phone_verified: z.boolean().default(false).optional(),
  email: z.string().email().max(255),
  email_verified: z.boolean().default(false).optional(),
  password: z.string().max(255),
});

export const stateSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
});

export const driverSchema = z.object({
  car_make: z.string(),
  car_model: z.string(),
  car_year: z.number(),
  userId: z.number(),
  online: z.boolean(),
  delivering: z.boolean(),
});

export const citySchema = z.object({
  // "id": 4,
  name: z.string(),
  stateId: z.number(),
});

export const orderSchema = z.object({
  id: z.number(),
  restaurant_id: z.number(),
  delivery_address_id: z.number(),
  user_id: z.number(),
  driver_id: z.number(),
  price: z.number(),
  final_price: z.number(),
});

export const addressSchema = z.object({
  street_address_1: z.string(),
  street_address_2: z.string(),
  city_id: z.number(),
  zip_code: z.string(),
  delivery_instructions: z.string(),
  user_id: z.number(),
});

export const commentSchema = z.object({
  order_id: z.number(),
  user_id: z.number(),
  comment_text: z.string(),
  is_complaint: z.boolean(),
  is_praise: z.boolean(),
});

export const categorySchema = z.object({
  name: z.string(),
  // description: z.string(),
});

export const menuItemSchema = z.object({
  name: z.string(),
  restaurant_id: z.number(),
  category_id: z.number(),
  description: z.string(),
  ingredients: z.string(),
  price: z.number(),
});

export const restaurantOwnerSchema = z.object({
  owner_id: z.number(),
  restaurant_id: z.number(),
});

export const orderStatusSchema = z.object({
  // name: z.string(),
  order_id: z.number(),
  status_catalog_id: z.number(),
  // description: z.string(),
});

export const statusCatalogSchema = z.object({
  name: z.string(),
  // description: z.string(),
});

export const orderMenuItemSchema = z.object({
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number(),
  item_price: z.number(),
  price: z.number(),
});
