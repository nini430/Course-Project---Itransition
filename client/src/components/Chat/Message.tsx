import styled from 'styled-components';
import moment from 'moment'
import {Box,Typography} from '@mui/material';
import { Message as MessageType } from '../../types/chat';
import Avatar from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png'

interface IMessageProps {
    fromMe:boolean;
    message:MessageType;
}

const Message = ({fromMe,message}:IMessageProps) => {
  return (
    <Box sx={{display:'flex',gap:'5px',alignSelf:fromMe?'flex-end':'flex-start',alignItems:'center',flexDirection:fromMe?'row':'row-reverse'}}>
       <MessageContainer fromMe={fromMe}>
        {message.text}
    </MessageContainer>
    <Avatar width={40} height={40} src={message.sender.profileImage || AvatarImg}/>
    <Typography sx={{fontSize:9}}>{moment(message.createdAt).format('HH:mm')}</Typography>
    </Box>
     
    
  )
}


const MessageContainer=styled(({fromMe:boolean,...rest}:any)=><div {...rest}/>)`
    padding:10px;
    background:${({fromMe})=>fromMe?'blue':'white'};
    border-radius:10px;
    color:${({fromMe})=>fromMe?'white':'black'};
`
export default Message;