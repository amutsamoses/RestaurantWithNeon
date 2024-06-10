import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIState, TSState, State } from "../drizzle/schema";

//get all states
export const stateService = async (): Promise<TSState[] | null> => {
  return await db.query.State.findMany();
};
//get one state
export const getStateService = async (
  id: number
): Promise<TIState | undefined> => {
  return await db.query.State.findFirst({
    where: eq(State.id, id),
  });
};

//create state
export const createStateService = async (user: TIState): Promise<TIState> => {
  await db.insert(State).values(user);
  return user;
};

//update state
export const updateStateService = async (
  id: number,
  user: TIState
): Promise<TIState> => {
  await db.update(State).set(user).where(eq(State.id, id));
  return user;
};

//delete state
export const deleteStateService = async (id: number) => {
  await db.delete(State).where(eq(State.id, id));
  return "user deleted successfully!😑";
};

export const stateCityService = async () => {
  return await db.query.State.findMany({
    with: {
      cities: true,
    },
  });
};
