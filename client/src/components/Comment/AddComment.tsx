import styled from 'styled-components';
import { useState, useEffect } from 'react';
import CommentAvatar from './shared/CommentAvatar';
import { Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { EmojiEmotions } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addComment } from '../../store/itemReducer';

const AddComment = () => {
  const { currentItem, addCommentLoading } = useAppSelector((state) => state.item);
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth=authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const dispatch = useAppDispatch();
  const [isEmojiPickerShown, setIsEmojiPickerShown] = useState(false);
  const [text, setText] = useState('');

  const handleEmojiClick = (emoji: any) => {
    setText((prev) => prev + emoji.emoji);
  };
  useEffect(()=>{
    const handleClickOutside=(e:MouseEvent)=>{
      const target=e.target as Element;
        if(!target.closest('.EmojiPickerReact') && !target.closest('.basic-emoji')) {
          setIsEmojiPickerShown(false);
        }
    }
    document.addEventListener('click',handleClickOutside);
    return ()=>{
      document.removeEventListener('click',handleClickOutside);
    }
  },[])
  return (
    <AddCommentContainer>
      <LeftContainer>
        <CommentAvatar fullName={`${auth?.firstName} ${auth?.lastName}`} src={auth?.profileImage} />
      </LeftContainer>
      <RightContainer>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type Your comment here..."
        />
        <EmojiContainer>
            <EmojiEmotions sx={{margin:'0 10px',cursor:'pointer'}} className='basic-emoji' onClick={() => setIsEmojiPickerShown((prev) => !prev)} />
          {isEmojiPickerShown && (
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          )}
        </EmojiContainer>

        <LoadingButton
            loading={addCommentLoading}
          disabled={!text}
          onClick={() => {
            dispatch(
              addComment({ input: { text }, itemId: currentItem?.id as string })
            );
            setText('');
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

const EmojiContainer = styled.div`
  position: relative;
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

export default AddComment;
