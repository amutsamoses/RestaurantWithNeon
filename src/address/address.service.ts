import { TIAddress, TSAddress, Address } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";

// GET ALL ADDRESSES
export const getAddressService = async (): Promise<TSAddress[] | null> => {
  const address = await db.query.Address.findMany();
  return address;
};

// GET SINGLE ADDRESS
export const getSingleAddressService = async (
  id: number
): Promise<TSAddress | undefined> => {
  const address = await db.query.Address.findFirst({
    where: eq(Address.id, id),
  });
  return address;
};

// CREATE ADDRESS
export const createAddressService = async (address: TIAddress) => {
  await db.insert(Address).values(address);
  return "Address created successfully";
};

//  UPDATE ADDRESS
export const updateAddressService = async (id: number, address: TIAddress) => {
  await db.update(Address).set(address).where(eq(Address.id, id));
  return "Address updated successfully";
};

// DELETE ADDRESS
export const deleteAddressService = async (id: number) => {
  await db.delete(Address).where(eq(Address.id, id));
  return "Address deleted successfully";
};
