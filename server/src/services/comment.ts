import { CommentInput, SimpleCommentInput } from '../types/comment';
import client from '../utils/prismaClient';
import { uploadImage } from './common';

const addComment = async (
  input: SimpleCommentInput,
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
  console.log('anu saertod aq???')
  const { text, image } = input;
  console.log(image);
  let updatedImage;
  if(image && image.name==='deleted') {
    updatedImage=undefined;
  }else if(image && image.name==='cloudinary') {
    console.log('????????')
    updatedImage=image.value;
  }else if(image && image.name==='base64') {
    console.log('base64')
    updatedImage=await uploadImage(image.value as string);
  }
  const updatedComment = await client.comment.update({
    data: { text, image: updatedImage },
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
