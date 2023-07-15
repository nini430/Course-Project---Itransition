import {ButtonGroup,Button} from '@mui/material'
import {Dispatch, SetStateAction} from 'react'
import { Comment } from '../../types/comment';
import { useAppDispatch } from '../../store/store';
import { setCommentEditMode } from '../../store/itemReducer';

interface IActionButtonsProps {
    setConfirmDialog:Dispatch<SetStateAction<null | Comment>>;
    comment: Comment;
    setIsInEditMode: Dispatch<SetStateAction<boolean>>;
    setIsMoreShown:Dispatch<SetStateAction<boolean>>
    setEditComment:Dispatch<SetStateAction<string>>;
}

const ActionButtons = ({setConfirmDialog,comment,setIsInEditMode,setIsMoreShown,setEditComment}:IActionButtonsProps) => {
  const dispatch=useAppDispatch();
  return (
    <ButtonGroup className='comment-action-btn' sx={{position:'absolute',right:20,top:-10}}>
        <Button onClick={()=>{
          setIsInEditMode(true);
          setIsMoreShown(false);
          setEditComment(comment.text);
          dispatch(setCommentEditMode(true));
          
        }}  sx={{border:'1px solid gray'}}>Edit</Button>
        <Button onClick={()=>{
          setConfirmDialog(comment);
          setIsMoreShown(false);
        }} sx={{border:'1px solid gray'}}>Delete</Button>
    </ButtonGroup>
  )
}

export default ActionButtons