import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  decimal,
  date,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// Restaurant Table
export const Restaurant = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  zip_code: varchar("zip_code", { length: 50 }).notNull(),
  city_id: integer("city_id").references(() => City.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Address Table
export const Address = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 255 }).notNull(),
  street_address_2: varchar("street_address_2", { length: 255 }),
  zip_code: varchar("zip_code", { length: 50 }).notNull(),
  delivery_instructions: text("delivery_instructions"),
  user_id: integer("user_id").references(() => Users.id, {
    onDelete: "cascade",
  }),
  city_id: integer("city_id").references(() => City.id, {
    onDelete: "cascade",
  }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Category Table
export const Category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

// City Table
export const City = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  state_id: integer("state_id").references(() => State.id, {
    onDelete: "cascade",
  }),
});

// Comment Table
export const Comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => Orders.id, {
    onDelete: "cascade",
  }),
  user_id: integer("user_id").references(() => Users.id, {
    onDelete: "cascade",
  }),
  comment_text: text("comment_text").notNull(),
  is_complaint: boolean("is_complaint").default(false),
  is_praise: boolean("is_praise").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Driver Table
export const Driver = pgTable("driver", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make", { length: 255 }).notNull(),
  car_model: varchar("car_model", { length: 255 }).notNull(),
  car_year: integer("car_year").notNull(),
  user_id: integer("user_id").references(() => Users.id, {
    onDelete: "cascade",
  }),
  online: boolean("online").default(false),
  delivering: boolean("delivering").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// MenuItem Table
export const MenuItem = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  restaurant_id: integer("restaurant_id").references(() => Restaurant.id, {
    onDelete: "cascade",
  }),
  category_id: integer("category_id").references(() => Category.id, {
    onDelete: "cascade",
  }),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: decimal("price").notNull(),
  active: boolean("active").default(true),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// OrderMenuItem Table
export const OrderMenuItem = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => Orders.id, {
    onDelete: "cascade",
  }),
  menu_item_id: integer("menu_item_id").references(() => MenuItem.id, {
    onDelete: "cascade",
  }),
  quantity: integer("quantity").notNull(),
  item_price: decimal("item_price").notNull(),
  price: decimal("price").notNull(),
  comment: text("comment"),
});

// OrderStatus Table
export const OrderStatus = pgTable("order_status", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => Orders.id, {
    onDelete: "cascade",
  }),
  status_catalog_id: integer("status_catalog_id").references(
    () => StatusCatalog.id,
    { onDelete: "cascade" }
  ),
  created_at: timestamp("created_at").defaultNow(),
});

// Orders Table
export const Orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => Restaurant.id, {
    onDelete: "cascade",
  }),
  estimated_delivery_time: timestamp("estimated_delivery_time"),
  actual_delivery_time: timestamp("actual_delivery_time"),
  delivery_address_id: integer("delivery_address_id").references(
    () => Address.id,
    { onDelete: "cascade" }
  ),
  user_id: integer("user_id").references(() => Users.id, {
    onDelete: "cascade",
  }),
  driver_id: integer("driver_id").references(() => Driver.id, {
    onDelete: "cascade",
  }),
  price: decimal("price").notNull(),
  discount: decimal("discount"),
  final_price: decimal("final_price").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// State Table
export const State = pgTable("state", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
});

// StatusCatalog Table
export const StatusCatalog = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

// Users Table
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 20 }),
  phone_verified: boolean("phone_verified").default(false),
  email: varchar("email", { length: 255 }).notNull(),
  email_verified: boolean("email_verified").default(false),
  confirmation_code: varchar("confirmation_code", { length: 6 }),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// RestaurantOwner Table
export const RestaurantOwner = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => Restaurant.id, {
    onDelete: "cascade",
  }),
  owner_id: integer("owner_id").references(() => Users.id, {
    onDelete: "cascade",
  }),
});

///////////////////////////////Relationships///////////////////////////////////////////

export const restaurantRelations = relations(Restaurant, ({ many, one }) => ({
  menuItems: many(MenuItem),
  orders: many(Orders),
  city: one(City, {
    fields: [Restaurant.city_id],
    references: [City.id],
  }),
  owners: many(RestaurantOwner),
}));

export const addressRelations = relations(Address, ({ one, many }) => ({
  city: one(City, {
    fields: [Address.city_id],
    references: [City.id],
  }),
  user: one(Users, {
    fields: [Address.user_id],
    references: [Users.id],
  }),
  orders: many(Orders),
}));

// City and Restaurant relationship
export const citiesRelations = relations(City, ({ many }) => ({
  restaurants: many(Restaurant),
}));

export const cityRelations = relations(City, ({ many, one }) => ({
  state: one(State, {
    fields: [City.state_id],
    references: [State.id],
  }),
  addresses: many(Address),
  restaurants: many(Restaurant),
}));

// Category and MenuItem relationship
export const categoryRelations = relations(Category, ({ many }) => ({
  menuItems: many(MenuItem),
}));

export const commentRelations = relations(Comment, ({ one }) => ({
  order: one(Orders, {
    fields: [Comment.order_id],
    references: [Orders.id],
  }),
  user: one(Users, {
    fields: [Comment.user_id],
    references: [Users.id],
  }),
}));

export const driverRelations = relations(Driver, ({ one, many }) => ({
  user: one(Users, {
    fields: [Driver.user_id],
    references: [Users.id],
  }),
  orders: many(Orders),
}));

export const menuItemRelations = relations(MenuItem, ({ one, many }) => ({
  restaurant: one(Restaurant, {
    fields: [MenuItem.restaurant_id],
    references: [Restaurant.id],
  }),
  category: one(Category, {
    fields: [MenuItem.category_id],
    references: [Category.id],
  }),
  orderMenuItems: many(OrderMenuItem),
}));

export const orderMenuItemRelations = relations(OrderMenuItem, ({ one }) => ({
  menuItem: one(MenuItem, {
    fields: [OrderMenuItem.menu_item_id],
    references: [MenuItem.id],
  }),
  order: one(Orders, {
    fields: [OrderMenuItem.order_id],
    references: [Orders.id],
  }),
}));

export const orderStatusRelations = relations(OrderStatus, ({ one }) => ({
  order: one(Orders, {
    fields: [OrderStatus.order_id],
    references: [Orders.id],
  }),
  statusCatalog: one(StatusCatalog, {
    fields: [OrderStatus.status_catalog_id],
    references: [StatusCatalog.id],
  }),
}));

export const orderRelations = relations(Orders, ({ one, many }) => ({
  restaurant: one(Restaurant, {
    fields: [Orders.restaurant_id],
    references: [Restaurant.id],
  }),
  deliveryAddress: one(Address, {
    fields: [Orders.delivery_address_id],
    references: [Address.id],
  }),
  user: one(Users, {
    fields: [Orders.user_id],
    references: [Users.id],
  }),
  driver: one(Driver, {
    fields: [Orders.driver_id],
    references: [Driver.id],
  }),
  comments: many(Comment),
  orderMenuItems: many(OrderMenuItem),
  orderStatuses: many(OrderStatus),
}));

export const restaurantOwnerRelations = relations(
  RestaurantOwner,
  ({ one }) => ({
    user: one(Users, {
      fields: [RestaurantOwner.owner_id],
      references: [Users.id],
    }),
    restaurant: one(Restaurant, {
      fields: [RestaurantOwner.restaurant_id],
      references: [Restaurant.id],
    }),
  })
);

// State and City relationship
export const stateRelations = relations(State, ({ many }) => ({
  cities: many(City),
}));

//cities with state relationship
export const stateCityRelations = relations(City, ({ one }) => ({
  state: one(State, {
    fields: [City.state_id],
    references: [State.id],
  }),
}));

export const statusCatalogRelations = relations(StatusCatalog, ({ many }) => ({
  orderStatuses: many(OrderStatus),
}));

export const userRelations = relations(Users, ({ many }) => ({
  addresses: many(Address),
  comments: many(Comment),
  drivers: many(Driver),
  orders: many(Orders),
  restaurantOwners: many(RestaurantOwner),
}));

// Types
export type TIUsers = typeof Users.$inferInsert;
export type TSUsers = typeof Users.$inferSelect;
export type TIAddress = typeof Address.$inferInsert;
export type TSAddress = typeof Address.$inferSelect;
export type TICity = typeof City.$inferInsert;
export type TSCity = typeof City.$inferSelect;
export type TIState = typeof State.$inferInsert;
export type TSState = typeof State.$inferSelect;
export type TIRestaurant = typeof Restaurant.$inferInsert;
export type TSRestaurant = typeof Restaurant.$inferSelect;
export type TICategory = typeof Category.$inferInsert;
export type TSCategory = typeof Category.$inferSelect;
export type TIMenuItem = typeof MenuItem.$inferInsert;
export type TSMenuItem = typeof MenuItem.$inferSelect;
export type TIOrder = typeof Orders.$inferInsert;
export type TSOrder = typeof Orders.$inferSelect;
export type TIOrderMenuItem = typeof OrderMenuItem.$inferInsert;
export type TSOrderMenuItem = typeof OrderMenuItem.$inferSelect;
export type TIOrderStatus = typeof OrderStatus.$inferInsert;
export type TSOrderStatus = typeof OrderStatus.$inferSelect;
export type TIStatusCatalog = typeof StatusCatalog.$inferInsert;
export type TSStatusCatalog = typeof StatusCatalog.$inferSelect;
export type TIComment = typeof Comment.$inferInsert;
export type TSComment = typeof Comment.$inferSelect;
export type TIDriver = typeof Driver.$inferInsert;
export type TSDriver = typeof Driver.$inferSelect;
export type TIRestaurantOwner = typeof RestaurantOwner.$inferInsert;
export type TSRestaurantOwner = typeof RestaurantOwner.$inferSelect;
