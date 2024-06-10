import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TSMenuItem, TIMenuItem, MenuItem } from "../drizzle/schema";


// GET ALL MENUITEMS
export const getMenuItemService = async (): Promise<TSMenuItem[] | null> => {
  const menuItem = await db.query.MenuItem.findMany();
  return menuItem;
};

// GET SINGLE MENUITEM
export const getSingleMenuItemService = async (
  id: number
): Promise<TSMenuItem | undefined> => {
  const menuItem = await db.query.MenuItem.findFirst({
    where: eq(MenuItem.id, id),
  });
  return menuItem;
};

// CREATE MENUITEM
export const createMenuItemService = async (menuItem: TIMenuItem) => {
  await db.insert(MenuItem).values(menuItem);
  return "MenuItem created successfully";
};

//  UPDATE MENUITEM
export const updateMenuItemService = async (id: number, menuItem: TIMenuItem) => {
  await db.update(MenuItem).set(menuItem).where(eq(MenuItem.id, id));
  return "MenuItem updated successfully";
};

// DELETE MENUITEM
export const deleteMenuItemService = async (id: number) => {
  await db.delete(MenuItem).where(eq(MenuItem.id, id));
  return "MenuItem deleted successfully";
};