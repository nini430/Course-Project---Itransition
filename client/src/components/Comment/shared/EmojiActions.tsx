
import { Dispatch, SetStateAction } from 'react';
import {  InsertPhoto } from '@mui/icons-material';
import {IconButton} from '@mui/material'

interface IEmojiActionsProps {
  uploadImg: File | null;
  getRootProps:any;
  getInputProps:any
}

const EmojiActions = ({
  uploadImg,
  getRootProps,
  getInputProps
}: IEmojiActionsProps) => {
  return (
    <>
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
