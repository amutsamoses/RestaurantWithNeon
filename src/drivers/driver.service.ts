import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIDriver, TSDriver, Driver } from "../drizzle/schema";

//select all driver
export const driverService = async (): Promise<TSDriver[] | null> => {
  return await db.query.Driver.findMany();
};

//select one driver
export const getDriverService = async (
  id: number
): Promise<TIDriver | undefined> => {
  return await db.query.Driver.findFirst({
    where: eq(Driver.id, id),
  });
};

//create driver
export const createDriverService = async (
  driver: TIDriver
): Promise<TIDriver> => {
  await db.insert(Driver).values(driver);
  return driver;
};
//update user
export const updateDriverService = async (
  id: number,
  driver: TIDriver
): Promise<TIDriver> => {
  await db.update(Driver).set(driver).where(eq(Driver.id, id));
  return driver;
};
//delete user
export const deleteDriverService = async (id: number) => {
  await db.delete(Driver).where(eq(Driver.id, id));
  return "user deleted successfully!😑";
};
