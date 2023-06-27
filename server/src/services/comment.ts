import { CommentInput } from '../types/comment';
import client from '../utils/prismaClient';

const addComment = async (
  input: CommentInput,
  itemId: string,
  authorId: string
) => {
  const { text } = input;
  const comment = await client.comment.create({
    data: { text, itemId, authorId },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          id: true,
        },
      },
    },
  });
  return comment;
};

const findCommentById = async (commentId: string) => {
  const comment = await client.comment.findUnique({ where: { id: commentId } });
  return comment;
};

const removeComment = async (commentId: string) => {
  await client.comment.delete({ where: { id: commentId } });
};

const editComment = async (commentId: string, input: CommentInput) => {
  const { text } = input;
  const updatedComment = await client.comment.update({
    data: { text },
    where: { id: commentId },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
          profileImage: true,
        },
      },
    },
  });
  return updatedComment;
};

export { addComment, findCommentById, removeComment, editComment };
