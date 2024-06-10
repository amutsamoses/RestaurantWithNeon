import { Context } from "hono";

import { getOrderMenuItemService,
    getSingleOrderMenuItemService,
    createOrderMenuItemService,
    updateOrderMenuItemService,
    deleteOrderMenuItemService 
 } from "./order_menu_item.service";


export const listOrderMenuItems = async (c: Context) => {
    try {
        const orderMenuItem = await getOrderMenuItemService();
        if (orderMenuItem == null || orderMenuItem.length == 0) {
            return c.text("No order menu item found", 404);
        }
        return c.json(orderMenuItem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

export const getSingleOrderMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderMenuItem = await getSingleOrderMenuItemService(id);
        if (orderMenuItem == null) {
            return c.text("Order Menu Item not found", 404);
        }
        return c.json(orderMenuItem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

export const createOrderMenuItem = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const result = await createOrderMenuItemService(orderMenuItem);

        if (!result) {
            return c.text("Order Menu Item not created", 400);
        }
        return c.json({ message: result }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

export const updateOrderMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderMenuItem = await c.req.json();

        const orderMenuItemExist = await getSingleOrderMenuItemService(id);
        if (!orderMenuItemExist == null) {
            return c.text("Order Menu Item not found", 404);
        }

        const result = await updateOrderMenuItemService(id, orderMenuItem);

        return c.json({ message: result }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

export const deleteOrderMenuItem = async (c: Context) => {

    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }

    try {

        const orderMenuItem = await getSingleOrderMenuItemService(id);
        if (!orderMenuItem) {
            return c.text("Order Menu Item not found", 404);
        }

        const result = await deleteOrderMenuItemService(id);
        
        return c.json({ message: result }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};