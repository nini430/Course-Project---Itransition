import {ButtonGroup,Button} from '@mui/material'
import {Dispatch, SetStateAction} from 'react'
import { Comment } from '../../types/comment';

interface IActionButtonsProps {
    setConfirmDialog:Dispatch<SetStateAction<null | Comment>>;
    comment: Comment;
    setIsInEditMode: Dispatch<SetStateAction<boolean>>;
    setIsMoreShown:Dispatch<SetStateAction<boolean>>
}

const ActionButtons = ({setConfirmDialog,comment,setIsInEditMode,setIsMoreShown}:IActionButtonsProps) => {
  return (
    <ButtonGroup className='comment-action-btn' sx={{position:'absolute',right:20,top:-10}}>
        <Button onClick={()=>{
          setIsInEditMode(true);
          setIsMoreShown(false);
        }}  sx={{border:'1px solid gray'}}>Edit</Button>
        <Button onClick={()=>{
          setConfirmDialog(comment);
          setIsMoreShown(false);
        }} sx={{border:'1px solid gray'}}>Delete</Button>
    </ButtonGroup>
  )
}

export default ActionButtons