import styled from 'styled-components';
import {useEffect,useState} from 'react'
import ConversationSidebar from './ConversationSidebar';
import Chat from './Chat';
import FriendRightbar from './FriendRightbar';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getCurrentConversations } from '../../../store/chatReducer';
import { Socket,io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';



const DesktopMessenger = () => {
  const navigate=useNavigate();
  const [socket,setSocket]=useState<Socket | null>(null);
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth= authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const dispatch=useAppDispatch();
  useEffect(()=>{
    if(!auth) {
      navigate('/login');
    }
  },[auth,navigate])
  useEffect(()=>{
    if(auth) {
      dispatch(getCurrentConversations());
    }
    
  },[dispatch,auth])

  useEffect(()=>{
    if(!socket && auth) {
      setSocket(io('http://localhost:7070',{query:{userId:auth.id}}));
    }
  },[socket,auth?.id])
  return (
    <Container>
    <ConversationSidebar/>
    <Chat socket={socket} />
    <FriendRightbar/>
    </Container>
  )
}

const Container=styled.div`
    display:grid;
    grid-template-columns: 1fr 3fr 1fr;
    height:calc(100vh - 80px);
`

export default DesktopMessenger