import styled from 'styled-components';
import {useEffect} from 'react'
import ConversationSidebar from './ConversationSidebar';
import Chat from './Chat';
import FriendRightbar from './FriendRightbar';
import { useAppDispatch } from '../../../store/store';
import { getCurrentConversations } from '../../../store/chatReducer';


const DesktopMessenger = () => {
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(getCurrentConversations());
  },[dispatch])
  return (
    <Container>
    <ConversationSidebar/>
    <Chat/>
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