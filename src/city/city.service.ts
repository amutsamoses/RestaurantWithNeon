import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICity, TSCity, City } from "../drizzle/schema";

export const cityService = async (): Promise<TSCity[] | null> => {
  return await db.query.City.findMany();
};

//get one city
export const getCityService = async (
  id: number
): Promise<TICity | undefined> => {
  return await db.query.City.findFirst({
    where: eq(City.id, id),
  });
};

//create city
export const createCityService = async (city: TICity): Promise<TICity> => {
  await db.insert(City).values(city);
  return city;
};
//update city
export const updateCityService = async (
  id: number,
  city: TICity
): Promise<TICity> => {
  await db.update(City).set(city).where(eq(City.id, id));
  return city;
};
//delete city
export const deleteCityService = async (id: number) => {
  await db.delete(City).where(eq(City.id, id));
  return "user deleted successfully!😑";
};
