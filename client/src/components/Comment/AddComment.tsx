import styled from 'styled-components';
import { Accept, useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import CommentAvatar from './shared/CommentAvatar';
import { InputBase } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addComment } from '../../store/itemReducer';
import { Link } from 'react-router-dom';
import { fileToBase64 } from '../../utils/fileToBase64';
import { Wrapper, ImageContainer, CloseContainer } from './shared/SharedStyles';
import EmojiActions from './shared/EmojiActions';


const AddComment = () => {
  const {isCommentEditMode}=useAppSelector(state=>state.item)
    
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
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const dispatch = useAppDispatch();
  const [isEmojiPickerShown, setIsEmojiPickerShown] = useState(false);
  const [text, setText] = useState('');

  return (
    <AddCommentContainer>
      <LeftContainer>
        <Link style={{ textDecoration: 'none' }} to={`/profile/${auth?.id}`}>
          <CommentAvatar
            isAdd
            fullName={`${auth?.firstName} ${auth?.lastName}`}
            src={auth?.profileImage}
          />
        </Link>
      </LeftContainer>
      <RightContainer>
        <Wrapper>
          <StyledInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type Your comment here..."
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
              })
            );
            setText('');
            setUploadImg(null);
          }}
          sx={{ border: '1px solid gray' }}
        >
          Post
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
