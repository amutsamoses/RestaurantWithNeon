import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";

import { commentSchema } from "../validators";

import {
  listComments,
  getSingleComment,
  createComment,
  updateComment,
  deleteComment,
} from "./comment.controller";

export const commentRouter = new Hono();

//get all comments
commentRouter.get("/comments", listComments);

commentRouter.get("/comments/:id", getSingleComment);

commentRouter.post(
  "/comments",
  zValidator("json", commentSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createComment
);

commentRouter.put(
  "/comments/:id",
  zValidator("json", commentSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateComment
);

commentRouter.delete("/comments/:id", deleteComment);
