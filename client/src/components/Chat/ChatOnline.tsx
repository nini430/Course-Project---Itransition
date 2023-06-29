import { Box, IconButton, Typography } from '@mui/material';
import styled from 'styled-components'
import Avatar from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png'
import { Message } from '@mui/icons-material';


interface ChatOnlineProps {
    src?: any;
    fullName:string;
}

const ChatOnline = ({src,fullName}:ChatOnlineProps) => {
  return (
   <OnlineContainer>
    <Box sx={{display:'flex',alignItems:'center',gap:'5px'}}>
      <AvatarWrapper>
      <Avatar width={40} height={40} src={src || AvatarImg }/>
      <OnlineCircle/>
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