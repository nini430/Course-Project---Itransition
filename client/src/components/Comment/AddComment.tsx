import styled from 'styled-components'
import {useState} from 'react'
import CommentAvatar from './shared/CommentAvatar'
import { Button, Input, IconButton } from '@mui/material'
import {EmojiEmotions} from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react'

const AddComment = () => {
    const [isEmojiPickerShown,setIsEmojiPickerShown]=useState(false);
  return (
    <AddCommentContainer>
        <LeftContainer>
            <CommentAvatar/>
        </LeftContainer>
        <RightContainer>
            <Input placeholder='Type Your comment here...'/>
            <EmojiContainer>
            <IconButton  onClick={()=>setIsEmojiPickerShown(prev=>!prev)}><EmojiEmotions/></IconButton>
           {isEmojiPickerShown && <EmojiPicker/> } 
            </EmojiContainer>
           
            <Button sx={{border:'1px solid gray'}}>Post</Button>
        </RightContainer>
    </AddCommentContainer>
  )
}


const AddCommentContainer=styled.div`
    display:flex;
    gap:10px;
    padding:10px;
`

const EmojiContainer=styled.div`
    position:relative;
`

const LeftContainer= styled.div`
    
`

const RightContainer=styled.div`
    flex-grow:1;
    width:100%;
    flex:1;
    align-self: end;
    display:flex;
    align-items:center;
    gap:2px;

    .MuiInput-root {
        width:100% !important;
    }
`

export default AddComment;