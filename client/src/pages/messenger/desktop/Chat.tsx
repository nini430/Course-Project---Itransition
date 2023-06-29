import { styled } from 'styled-components'
import ChatInput from '../../../components/Chat/ChatInput'

const Chat = () => {
  return (
    <ChatContainer>
    <ConversationContainer>

    </ConversationContainer>
    <ChatInput/>
    </ChatContainer>
  )
}

const ChatContainer=styled.div`
    border-right:1px solid gray;
    display:flex;
    flex-direction:column;

`

const ConversationContainer=styled.div`
    flex-grow: 1;
`


export default Chat