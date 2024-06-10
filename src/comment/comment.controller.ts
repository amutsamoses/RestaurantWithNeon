import { Context } from "hono";

import {
  getCommentService,
  getSingleCommentService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} from "./comment.service";

import { undefined } from "zod";

export const listComments = async (c: Context) => {
  try {
    const comment = await getCommentService();
    if (comment == null || comment.length == 0) {
      return c.text("No comment found", 404);
    }
    return c.json(comment, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleComment = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const comment = await getSingleCommentService(id);
    if (comment == null) {
      return c.text("Comment not found", 404);
    }
    return c.text("Comment not found", 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const createComment = async (c: Context) => {
  try {
    const comment = await c.req.json();
    const result = await createCommentService(comment);

    if (!result) {
      return c.text("Comment not created", 400);
    }
    return c.json({ message: result }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const updateComment = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    const comment = await c.req.json();

    // search for user by id
    const commentFound = await getSingleCommentService(id);
    if (commentFound == null) {
      return c.text("Comment not found", 404);
    }

    const result = await updateCommentService(id, comment);
    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const deleteComment = async (c: Context) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    return c.text("Invalid id", 400);
  }

  try {
    const comment = await getSingleCommentService(id);
    if (!comment) {
      return c.text("Comment not found", 404);
    }

    const result = await deleteCommentService(id);

    return c.json({ message: result }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};
