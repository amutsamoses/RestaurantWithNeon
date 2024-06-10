import {
  TIStatusCatalog,
  TSStatusCatalog,
  StatusCatalog,
} from "../drizzle/schema";

import { eq } from "drizzle-orm";
import db from "../drizzle/db";

// GET ALL STATUS CATALOG
export const getStatusCatalogService = async (): Promise<TSStatusCatalog[] | null> => {
  const statusCatalog = await db.query.StatusCatalog.findMany();
  return statusCatalog;
};

// GET SINGLE STATUS CATALOG
export const getSingleStatusCatalogService = async (
  id: number
): Promise<TSStatusCatalog | undefined> => {
  const statusCatalog = await db.query.StatusCatalog.findFirst({
    where: eq(StatusCatalog.id, id),
  });
  return statusCatalog;
};

// CREATE STATUS CATALOG
export const createStatusCatalogService = async (statusCatalog: TIStatusCatalog) => {
  await db.insert(StatusCatalog).values(statusCatalog);
  return "Status Catalog created successfully";
};

//  UPDATE STATUS CATALOG
export const updateStatusCatalogService = async (id: number, statusCatalog: TIStatusCatalog) => {
  await db.update(StatusCatalog).set(statusCatalog).where(eq(StatusCatalog.id, id));
  return "Status Catalog updated successfully";
};

// DELETE STATUS CATALOG
export const deleteStatusCatalogService = async (id: number) => {
  await db.delete(StatusCatalog).where(eq(StatusCatalog.id, id));
  return "Status Catalog deleted successfully";
};
