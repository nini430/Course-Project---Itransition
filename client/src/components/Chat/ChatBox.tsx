import { styled } from 'styled-components'
import Avatar from '../Avatar/Avatar'
import AvatarImg from '../../assets/avatar.png'
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMessages } from '../../store/chatReducer';

interface IChatBoxProps {
    recipient:any;
    chat:any;
}

const ChatBox = ({recipient,chat}:IChatBoxProps) => {
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth=authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const dispatch=useAppDispatch();
  return (
    <ChatBoxContainer onClick={()=>{
      dispatch(getMessages({memberOne:auth.id,memberTwo:recipient.id}))
    }}>
        <Avatar src={recipient.profileImage || AvatarImg } width={50} height={50}/>
        <Typography>
        {recipient.firstName} {recipient.lastName}  
        </Typography>
    </ChatBoxContainer>
  )
}

const ChatBoxContainer=styled.div`
        display:flex;
        align-items:center;
        gap:10px;
        cursor:pointer;
        padding:5px;
        border-radius:5px;
        &:hover {
            background:gray;
        }
`

export default ChatBox