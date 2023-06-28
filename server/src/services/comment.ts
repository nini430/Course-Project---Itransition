import { CommentInput } from '../types/comment';
import client from '../utils/prismaClient';
import { uploadImage } from './common';

const addComment = async (
  input: CommentInput,
  itemId: string,
  authorId: string
) => {
  const { text, image } = input;
  let uploadedImage;
  if (image) {
    uploadedImage = await uploadImage(image);
  }
  const comment = await client.comment.create({
    data: {
      text,
      itemId,
      authorId,
      image: uploadedImage ? uploadedImage : null,
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          id: true,
        },
      },
      reactions: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return comment;
};

const findCommentById = async (commentId: string) => {
  const comment = await client.comment.findUnique({
    where: { id: commentId },
    include: {
      reactions: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              id: true,
            },
          },
        },
      },
    },
  });
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
      reactions:{
        include:{
          user:{
            select:{
              firstName:true,
              lastName:true,
              id:true,
              profileImage:true
            }
          }
        }
      }
    },
  });
  return updatedComment;
};

export { addComment, findCommentById, removeComment, editComment };
