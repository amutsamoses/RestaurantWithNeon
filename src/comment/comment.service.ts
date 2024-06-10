import { TIComment, TSComment, Comment } from "../drizzle/schema";

import db from "../drizzle/db";

import { eq } from "drizzle-orm";

// GET ALL COMMENTS

export const getCommentService = async (): Promise<TSComment[] | null> => {
  const comment = await db.query.Comment.findMany();
  return comment;
};

// GET SINGLE COMMENT
export const getSingleCommentService = async (
  id: number
): Promise<TSComment | undefined> => {
  const comment = await db.query.Comment.findFirst({
    where: eq(Comment.id, id),
  });
  return comment;
};

//create comment
export const createCommentService = async (comment: TIComment) => {
  await db.insert(Comment).values(comment);
  return "Comment created successfully";
};

//update comment
export const updateCommentService = async (id: number, comment: TIComment) => {
  await db.update(Comment).set(comment).where(eq(Comment.id, id));
  return "Comment updated successfully";
};

// delete comment
export const deleteCommentService = async (id: number) => {
  await db.delete(Comment).where(eq(Comment.id, id));
  return "Comment deleted successfully";
};
