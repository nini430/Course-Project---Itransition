import { Dispatch, SetStateAction } from 'react';
import { InsertPhoto, EmojiEmotions } from '@mui/icons-material';
import { IconButton, ClickAwayListener } from '@mui/material';
import ReactEmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface IEmojiActionsProps {
  uploadImg: File | null;
  getRootProps: any;
  getInputProps: any;
  isEmojiPickerShown?: boolean;
  setIsEmojiPickerShown?: Dispatch<SetStateAction<boolean>>;
  setText?: Dispatch<SetStateAction<string>>;
  add?: boolean;
}

const EmojiActions = ({
  uploadImg,
  getRootProps,
  getInputProps,
  isEmojiPickerShown,
  setIsEmojiPickerShown,
  setText,
  add,
}: IEmojiActionsProps) => {
  const basicEmoji = document.getElementById('basic-emoji');
  const EmojiPickerReact = document.getElementsByClassName('EmojiPickerReact');
  const handleEmojiClick = (emoji: EmojiClickData) => {
    setText && setText((prev) => prev + emoji.emoji);
  };
  return (
    <>
      {add && (
        <IconButton
          onClick={() => {
            if (setIsEmojiPickerShown) {
              setIsEmojiPickerShown((prev) => !prev);
            }
          }}
          id="basic-emoji"
        >
          {isEmojiPickerShown && (
            <ClickAwayListener
              onClickAway={(e) => {
                if (
                  e.target &&
                  !basicEmoji?.contains(e.target as Node) &&
                  !EmojiPickerReact[0].contains(e.target as Node)
                ) {
                setIsEmojiPickerShown &&  setIsEmojiPickerShown(false);
                }
              }}
            >
              <div>
                <ReactEmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            </ClickAwayListener>
          )}
          <EmojiEmotions sx={{ pointerEvents: 'none' }} />
        </IconButton>
      )}
      {!uploadImg && (
        <IconButton {...getRootProps()}>
          <input {...getInputProps()} type="file" />
          <InsertPhoto />
        </IconButton>
      )}
    </>
  );
};

export default EmojiActions;
