import { Typography, IconButton, ButtonGroup, Input } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import moment from 'moment';
import ShowMore from 'react-show-more';
import { useState, useEffect } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import {Toaster,toast} from 'react-hot-toast'

import styled from 'styled-components';
import CommentAvatar from './shared/CommentAvatar';
import { Comment as CommentType } from '../../types/comment';
import { MoreVert } from '@mui/icons-material';
import ActionButtons from './ActionButtons';
import Reaction from '../Reaction/Reaction';
import ConfirmDialog from '../shared/ConfirmDialog';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  reactComment,
  removeComment,
  setCommentEditMode,
  toggleCommentImage,
  unreactComment,
} from '../../store/itemReducer';
import { LoadingButton } from '@mui/lab';
import { editComment as editCommentHandler } from '../../store/itemReducer';
import { reactions } from '../../utils/reactions';
import { Link } from 'react-router-dom';
import ImageModal from '../shared/ImageModal';
import { Wrapper, CloseContainer, ImageContainer } from './shared/SharedStyles';
import EmojiActions from './shared/EmojiActions';
import { useTranslation } from 'react-i18next';
import toastOptions from '../../utils/toastOptions';
import { fileToBase64 } from '../../utils/fileToBase64';

interface ICommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: ICommentProps) => {
  const {t}=useTranslation();
  const [currentComment,setCurrentComment]=useState(comment);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [isEmojiPickerShown, setIsEmojiPickerShown] = useState(false);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const liked = comment.reactions?.find(
    (reaction) => reaction.userId === auth?.id
  );
  const { editCommentLoading } = useAppSelector((state) => state.item);
  const [editComment, setEditComment] = useState(comment.text);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const { removeCommentLoading } = useAppSelector((state) => state.item);
  const [isEmojiShown, setIsEmojiShown] = useState(false);
  const [animationPause, setAnimationPause] = useState(false);
  const [isMoreShown, setIsMoreShown] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<CommentType | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles) => {
      setUploadImg(acceptedFiles[0]);
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        !target.closest('.comment-action-btn') &&
        !target.closest('.more-vert')
      ) {
        setIsMoreShown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <CommentContainer>
      <Toaster/>
      <LeftCommentSection>
        <Link
          style={{ textDecoration: 'none' }}
          to={`/profile/${comment.author.id}`}
        >
          <CommentAvatar
            src={comment.author?.profileImage}
            fullName={`${comment.author?.firstName} ${comment.author?.lastName}`}
          />
        </Link>
      </LeftCommentSection>
      <CenterCommentSection>
        {isInEditMode ? (
          <EditCommentWrapper>
            <Wrapper>
              <FullEditContainer>
                <Input
                  sx={{ width: '100%' }}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <EmojiActions
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  isEmojiPickerShown={isEmojiPickerShown}
                  setIsEmojiPickerShown={setIsEmojiPickerShown}
                  setText={setEditComment}
                  uploadImg={uploadImg}
                />
              </FullEditContainer>

              {(currentComment.image || uploadImg) && (
                <ImageContainer>
                  <img
                    width={200}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    src={
                      uploadImg ? URL.createObjectURL(uploadImg) : currentComment.image
                    }
                    alt=""
                  />
                  <CloseContainer
                    onClick={() =>{
                      if(currentComment.image) {
                        setCurrentComment(prev=>({...prev,image:undefined}))
                      }else{
                        setUploadImg(null);
                      }
                    }         
                    }
                  >
                    X
                  </CloseContainer>
                </ImageContainer>
              )}
            </Wrapper>

            <ButtonGroup>
              <LoadingButton
                loading={editCommentLoading}
                onClick={async() => {
                  dispatch(
                    editCommentHandler({
                      commentId: comment.id,
                      input: { text: editComment, image: uploadImg? {value:await fileToBase64(uploadImg) as string,name:'base64'}: currentComment.image? {name:'cloudinary',value:currentComment.image} : {name:'deleted',value:undefined}},
                      onSuccess: (message:string) => {
                        setIsInEditMode(false);
                        toast.success(t(`messages.${message||'success'}`,toastOptions));
                        dispatch(setCommentEditMode(false));
                      },
                    }))}}
                startIcon={<Save />}
                sx={{ border: '1px solid gray' }}
              >
                Save
              </LoadingButton>
              <LoadingButton
                startIcon={<Cancel />}
                onClick={() => {
                  setIsInEditMode(false);
                  setEditComment(comment.text);
                  dispatch(setCommentEditMode(false));
                  setCurrentComment(comment);
                  setUploadImg(null);
                }}
                sx={{ border: '1px solid gray' }}
              >
                Cancel
              </LoadingButton>
            </ButtonGroup>
          </EditCommentWrapper>
        ) : (
          <>
            {comment.text.length > 50 ? (
              <ShowMore lines={1} more="Show more" less="Show less">
                {comment?.text}
              </ShowMore>
            ) : (
              comment.text
            )}

            {comment.image && (
              <CommentImg
                onClick={() => setImageModal(comment.image as string)}
                width={200}
                height={100}
                style={{ objectFit: 'cover', cursor: 'pointer' }}
                src={comment.image}
              />
            )}
            <TypoWrapper>
              <ReactionContainer
                onMouseOut={() => setIsEmojiShown(false)}
                onMouseOver={() => setIsEmojiShown(true)}
              >
                {isEmojiShown && (
                  <Reaction
                    setAnimationPause={setAnimationPause}
                    animationPause={animationPause}
                    setIsEmojiShown={setIsEmojiShown}
                    bottomPx="15px"
                    action={(emoji: string) => {
                      dispatch(reactComment({ emoji, commentId: comment.id }));
                    }}
                  />
                )}
                <TypoWrapper>
                  <Typography
                    sx={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      fontSize: 12,
                    }}
                  >
                    {liked ? (
                      <Typography
                        onClick={() => {
                          dispatch(unreactComment({ reactionId: liked?.id }));
                        }}
                      >
                        {
                          reactions.find((react) => react.name === liked.name)
                            ?.emoji
                        }
                        {liked.name}
                      </Typography>
                    ) : (
                      <span
                        onClick={() => {
                          dispatch(
                            reactComment({
                              commentId: comment.id,
                              emoji: 'like',
                            })
                          );
                        }}
                      >
                        Like
                      </span>
                    )}
                  </Typography>
                </TypoWrapper>
              </ReactionContainer>
              {comment.reactions.length > 0 && (
                <Typography>{comment.reactions.length} reaction(s)</Typography>
              )}
            </TypoWrapper>
          </>
        )}
      </CenterCommentSection>
      <RightCommentSection>
        {isMoreShown && (
          <ActionButtons
            setIsInEditMode={setIsInEditMode}
            comment={comment}
            setEditComment={setEditComment}
            setConfirmDialog={setConfirmDialog}
            setIsMoreShown={setIsMoreShown}
          />
        )}
        <IconButton onClick={() => setIsMoreShown((prev) => !prev)}>
          <MoreVert className="more-vert" />
        </IconButton>

        <Typography sx={{ color: 'gray', fontSize: 12 }}>
          {moment(comment?.updatedAt).format('HH:mm')}
        </Typography>
      </RightCommentSection>
      {confirmDialog && (
        <ConfirmDialog
          open={confirmDialog}
          loading={removeCommentLoading}
          onClose={() => setConfirmDialog(null)}
          onOk={() => {
            dispatch(
              removeComment({
                commentId: comment.id,
                onSuccess: (message:string) => {
                  setConfirmDialog(null);
                  toast.success(t(`messages.${message||'success'}`,toastOptions));
                  
                },
              })
            );
          }}
        />
      )}
      <ImageModal image={imageModal} onClose={() => setImageModal(null)} />
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
`;

const FullEditContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReactionContainer = styled.div`
  position: relative;
`;

const TypoWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 10px;
`;

const LeftCommentSection = styled.div``;

const CenterCommentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  gap: 10px;
`;

const RightCommentSection = styled.div`
  position: relative;
`;
const EditCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const CommentImg = styled.img`
  object-fit: cover;
  cursor: pointer;
`;

export default Comment;
