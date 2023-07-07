import { styled } from 'styled-components';
import ChatInput from '../../../components/Chat/ChatInput';
import { Typography } from '@mui/material';
import Avatar from '../../../components/Avatar/Avatar';
import AvatarImg from '../../../assets/avatar.png';
import Message from '../../../components/Chat/Message';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useRef, useState } from 'react';
import { SimpleUser } from '../../../types/auth';
import { Socket } from 'socket.io-client';
import { receiveMessage } from '../../../store/chatReducer';
import { current } from '@reduxjs/toolkit';

interface IChatProps {
  socket: null | Socket
}

const Chat = ({socket}:IChatProps) => {
  const dispatch=useAppDispatch();
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth=authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const { currentChat } = useAppSelector((state) => state.chat);
  const [recipient,setRecipient]=useState<SimpleUser | null>(null);
  const scrollRef=useRef<any>(null);
  useEffect(()=>{
    if(currentChat) {
      setRecipient(currentChat.chat.userOne?.id===auth.id?currentChat.chat.userTwo:currentChat.chat.userOne)
      console.log(currentChat.chat.userOne.id===auth.id?currentChat.chat.userTwo:currentChat.chat.userOne)
    }
  },[currentChat,auth.id])
  useEffect(()=>{
    const handleReceiveMessage=(message:any)=>{
        dispatch(receiveMessage(message))
        console.log(currentChat?.chat.id,message.chatId)
          setTimeout(()=>{
            scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
          },100)
          
    }
    socket?.on('receive-message',handleReceiveMessage);
    return ()=>{
      socket?.off('receive-message',handleReceiveMessage);
    }
  },[socket,dispatch])
  return (
    <ChatContainer>
      {currentChat && (
        <Header>
          <Avatar width={40} height={40} src={AvatarImg} />
          <Typography>{recipient?.firstName} {recipient?.lastName}</Typography>
        </Header>
      )}
      <ConversationContainer ref={scrollRef}>
        {currentChat ? (
          <>
          {currentChat.messages.map(message=>(
            <Message message={message} fromMe={message.senderId===auth.id} />
          ))}
            
          </>
        ) : (
          <Typography
            sx={{
              alignSelf: 'center',
              fontSize: 28,
              fontStyle: 'italic',
              color: 'gray',
            }}
          >
            Select A conversation and start chatting!
          </Typography>
        )}
      </ConversationContainer>
      <ChatInput socket={socket} scrollRef={scrollRef} />
    </ChatContainer>
  );
};

const Header = styled.div`
  height: 70px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  gap: 5px;
`;

const ChatContainer = styled.div`
  border-right: 1px solid gray;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
`;

const ConversationContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  max-height: calc(100vh - 80px - 70px - 115px);
  overflow-y: auto;
  scroll-behavior: smooth;
  position:relative;
`;

export default Chat;
