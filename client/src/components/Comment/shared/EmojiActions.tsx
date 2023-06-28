import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { EmojiEmotions, InsertPhoto } from '@mui/icons-material';
import {IconButton} from '@mui/material'
import EmojiPicker from 'emoji-picker-react';

interface IEmojiActionsProps {
  isEmojiPickerShown: boolean;
  setIsEmojiPickerShown: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
  uploadImg: File | null;
  getRootProps:any;
  getInputProps:any
}

const EmojiActions = ({
  isEmojiPickerShown,
  setIsEmojiPickerShown,
  setText,
  uploadImg,
  getRootProps,
  getInputProps
}: IEmojiActionsProps) => {
  const handleEmojiClick = (emoji: any) => {
    setText((prev) => prev + emoji.emoji);
  };
  return (
    <>
      <EmojiContainer>
        <EmojiEmotions
          sx={{ margin: '0 10px', cursor: 'pointer' }}
          className="basic-emoji"
          onClick={() => setIsEmojiPickerShown((prev) => !prev)}
        />
        {isEmojiPickerShown && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </EmojiContainer>

      {!uploadImg && (
        <IconButton {...getRootProps()}>
          <input {...getInputProps()} type="file" />
          <InsertPhoto />
        </IconButton>
      )}
    </>
  );
};

const EmojiContainer = styled.div`
  position: relative;
`;

export default EmojiActions;
