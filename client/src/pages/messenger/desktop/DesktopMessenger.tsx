import styled from 'styled-components';
import ConversationSidebar from './ConversationSidebar';
import Chat from './Chat';
import FriendRightbar from './FriendRightbar';


const DesktopMessenger = () => {
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
    min-height:calc(100vh - 80px);
    padding:20px;
`

export default DesktopMessenger