import { Send } from '@mui/icons-material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { sendMessage } from '../../store/chatReducer';

interface IChatInputProps {
  scrollRef:any;
}

const ChatInput = ({scrollRef}:IChatInputProps) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const { currentChat } = useAppSelector((state) => state.chat);
  const recipient =
    currentChat?.chat.memberOneId === auth.id
      ? currentChat?.chat.memberTwoId
      : currentChat?.chat.memberOneId;
  return (
    <ChatInputContainer>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        rows={5}
        sx={{ width: '100%' }}
        multiline
      />
      <LoadingButton
        onClick={() => {
          dispatch(
            sendMessage({
              text: input,
              chatId: currentChat?.chat.id as string,
              receiverId: recipient as string,
              onSuccess:()=>{
                setInput('')
                setTimeout(()=>{
                  scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
                },100)
              }
            })
          );
        }}
        disabled={!input || !currentChat}
        sx={{ border: '1px solid gray' }}
        fullWidth
        startIcon={<Send />}
      >
        Send
      </LoadingButton>
    </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  width: 100%;
`;

export default ChatInput;
