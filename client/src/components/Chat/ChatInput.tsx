import {TextField} from '@mui/material'
import { styled } from 'styled-components'

const ChatInput = () => {
  return (
    <ChatInputContainer>
        <TextField placeholder='Type your message...' rows={5} sx={{width:'100%'}} multiline/>
    </ChatInputContainer>
  )
}


const ChatInputContainer=styled.div`
    width:100%;
`



export default ChatInput