import styled from 'styled-components';
import { Accept, useDropzone } from 'react-dropzone';
import { useState } from 'react';
import CommentAvatar from './shared/CommentAvatar';
import { InputBase } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addComment } from '../../store/itemReducer';
import { Link } from 'react-router-dom';
import { fileToBase64 } from '../../utils/fileToBase64';
import { Wrapper, ImageContainer, CloseContainer } from './shared/SharedStyles';
import EmojiActions from './shared/EmojiActions';
import { Socket } from 'socket.io-client';
import { Comment } from '../../types/comment';
import { useTranslation } from 'react-i18next';

interface IAddCommentProps {
  socket: Socket | null;
}

const AddComment = ({ socket }: IAddCommentProps) => {
  const { isCommentEditMode } = useAppSelector((state) => state.item);

  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles) => {
      setUploadImg(acceptedFiles[0]);
    },
  });
  const { currentItem, addCommentLoading } = useAppSelector(
    (state) => state.item
  );
  const { authedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isEmojiPickerShown, setIsEmojiPickerShown] = useState(false);
  const [text, setText] = useState('');
  const {t}=useTranslation();

  return (
    <AddCommentContainer>
      <LeftContainer>
        <Link style={{ textDecoration: 'none' }} to={`/profile/${authedUser?.id}`}>
          <CommentAvatar
            isAdd
            src={authedUser?.profileImage}
          />
        </Link>
      </LeftContainer>
      <RightContainer>
        <Wrapper>
          <StyledInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('item.type_comment') as string}
          />
          {uploadImg && (
            <ImageContainer>
              <img
                style={{ objectFit: 'cover' }}
                width={200}
                height={100}
                src={URL.createObjectURL(uploadImg)}
                alt=""
              />
              <CloseContainer onClick={() => setUploadImg(null)}>
                X
              </CloseContainer>
            </ImageContainer>
          )}
        </Wrapper>
        <EmojiActions
          getInputProps={getInputProps}
          getRootProps={getRootProps}
          isEmojiPickerShown={isEmojiPickerShown}
          setIsEmojiPickerShown={setIsEmojiPickerShown}
          setText={setText}
          uploadImg={uploadImg}
          add={true}
        />
        <LoadingButton
          loading={addCommentLoading}
          disabled={(!text && !uploadImg) || isCommentEditMode}
          onClick={async () => {
            dispatch(
              addComment({
                input: {
                  text,
                  image: uploadImg
                    ? ((await fileToBase64(uploadImg)) as string)
                    : undefined,
                },
                itemId: currentItem?.id as string,
                onSuccess:(data:Comment)=>{
                  socket && socket.emit('add-comment',data);
                }
              })  
            );
            setText('');
            setUploadImg(null);
          }}
          sx={{ border: '1px solid gray' }}
        >
         {t('item.post')}
        </LoadingButton>
      </RightContainer>
    </AddCommentContainer>
  );
};

const AddCommentContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  flex: 1;
  align-self: end;
  display: flex;
  align-items: center;
  gap: 2px;

  .MuiInput-root {
    width: 100% !important;
  }
`;

const StyledInput = styled(InputBase)`
  border: none !important;
  outline: none !important;
  padding: 4px;
`;

export default AddComment;
