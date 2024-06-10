import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUsers, TSUsers, Users } from "../drizzle/schema";

export const userService = async (): Promise<TSUsers[] | null> => {
  return await db.select().from(Users);
};

//get one user
export const getSingleUserService = async (
  id: TSUsers["id"]
): Promise<TSUsers[]> => {
  return await db.select().from(Users).where(eq(Users.id, id));
};

//create user
export const createUserService = async (user: TIUsers): Promise<TIUsers> => {
  await db.insert(Users).values(user);
  return user;
};

//update user
export const updateUserService = async (
  id: number,
  user: TIUsers
): Promise<TIUsers> => {
  await db.update(Users).set(user).where(eq(Users.id, id));
  return user;
};
//delete user
export const deleteUserService = async (id: number) => {
  await db.delete(Users).where(eq(Users.id, id));
  return "user deleted successfully!😑";
};
