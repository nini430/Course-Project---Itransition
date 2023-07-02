import { Box, IconButton, Typography } from '@mui/material';
import styled from 'styled-components'
import Avatar from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png'
import { Message } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMessages } from '../../store/chatReducer';


interface ChatOnlineProps {
    src?: any;
    fullName:string;
    memberId:string;
}

const ChatOnline = ({src,fullName,memberId}:ChatOnlineProps) => {
  const dispatch=useAppDispatch();
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth= authedUser?.id || JSON.parse(localStorage.getItem('authed_user') as string);
  return (
   <OnlineContainer onClick={()=>{
      dispatch(getMessages({memberOne:auth.id,memberTwo:memberId}));
   }}>
    <Box sx={{display:'flex',alignItems:'center',gap:'5px'}}>
      <AvatarWrapper>
      <Avatar width={40} height={40} src={src || AvatarImg }/>
      </AvatarWrapper>
      
      <Typography>{fullName}</Typography>
    </Box>
    <IconButton>
      <Message/>
    </IconButton>
   </OnlineContainer>
  )
}

const OnlineContainer=styled.div`
    display:flex;
    justify-content: space-between;
    cursor:pointer;
    transition:all 0.6s rase;
    border-radius:5px;
    padding:5px;
    &:hover {
      background-color: #dbd5d5;
    }
`

const AvatarWrapper=styled.div`
  position:relative;
`

const OnlineCircle=styled.div`
 width:15px;
 height:15px;
 background:limegreen;
 border-radius:50%;
 position:absolute;
 right:0;
 bottom:7px;
`





export default ChatOnline