import styled from 'styled-components'
import { useAppSelector } from '../../../store/store'
import { Box, CircularProgress, Typography } from '@mui/material';
import Avatar from '../../../components/Avatar/Avatar';
import AvatarImg from '../../../assets/avatar.png'
import ChatBox from '../../../components/Chat/ChatBox';


const ConversationSidebar = () => {
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth=authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const {getCurrentConversationsLoading,currentConversations}=useAppSelector(state=>state.chat);
  
  if(getCurrentConversationsLoading) {
    return (
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <CircularProgress size={75}/>
      </Box>
    )
  }
   if(currentConversations && (currentConversations as any).length===0) {
    return (
      <Typography sx={{fontSize:20,p:3,borderRight:'1px solid gray'}}>No Conversations Yet</Typography>
    )
   }
  return (
    <SidebarContainer>
      {currentConversations && (currentConversations as any).map((convo:any)=>{
        const recipient=convo.userOne.id===auth.id?convo.userTwo:convo.userOne;
        return (
          <ChatBox chat={convo}  recipient={recipient} />
        )
        
})}
    </SidebarContainer>
  )
}
const SidebarContainer=styled.div`
    border-right:1px solid gray;
    padding:10px;
`

export default ConversationSidebar;