import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  listState,
  getSingleState,
  createState,
  updateState,
  deleteState,
  stateWithCity,
} from "./state.controller";
import { get } from "http";
import { stateSchema } from "../validators";

export const stateRouter = new Hono();

stateRouter.get("/states", listState);
stateRouter.get("/state/:id", getSingleState);
stateRouter.post(
  "/state",
  zValidator("json", stateSchema, (results, c) => {
    // Explicitly type the 'c' parameter as 'Response'
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createState
);
stateRouter.put("/state/:id", updateState);
stateRouter.delete("/state/:id", deleteState);

stateRouter.get("/states_with_cities", stateWithCity);
