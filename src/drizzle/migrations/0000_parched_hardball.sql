CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_address_1" varchar(255) NOT NULL,
	"street_address_2" varchar(255),
	"zip_code" varchar(50) NOT NULL,
	"delivery_instructions" text,
	"user_id" integer,
	"city_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"state_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"user_id" integer,
	"comment_text" text NOT NULL,
	"is_complaint" boolean DEFAULT false,
	"is_praise" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "driver" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_make" varchar(255) NOT NULL,
	"car_model" varchar(255) NOT NULL,
	"car_year" integer NOT NULL,
	"user_id" integer,
	"online" boolean DEFAULT false,
	"delivering" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"restaurant_id" integer,
	"category_id" integer,
	"description" text NOT NULL,
	"ingredients" text NOT NULL,
	"price" numeric NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"menu_item_id" integer,
	"quantity" integer NOT NULL,
	"item_price" numeric NOT NULL,
	"price" numeric NOT NULL,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"status_catalog_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer,
	"estimated_delivery_time" timestamp,
	"actual_delivery_time" timestamp,
	"delivery_address_id" integer,
	"user_id" integer,
	"driver_id" integer,
	"price" numeric NOT NULL,
	"discount" numeric,
	"final_price" numeric NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"street_address" varchar(255) NOT NULL,
	"zip_code" varchar(50) NOT NULL,
	"city_id" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant_owner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer,
	"owner_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "state" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status_catalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"contact_phone" varchar(20),
	"phone_verified" boolean DEFAULT false,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"confirmation_code" varchar(6),
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "city" ADD CONSTRAINT "city_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "driver" ADD CONSTRAINT "driver_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_status_catalog_id_status_catalog_id_fk" FOREIGN KEY ("status_catalog_id") REFERENCES "public"."status_catalog"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_address_id_address_id_fk" FOREIGN KEY ("delivery_address_id") REFERENCES "public"."address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_driver_id_driver_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."driver"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
