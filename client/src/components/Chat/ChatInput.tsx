import { Send, EmojiEmotions, InsertPhoto } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { IconButton, TextField } from '@mui/material';
import {Accept, useDropzone} from 'react-dropzone'
import { styled } from 'styled-components';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { sendMessage } from '../../store/chatReducer';
import { Socket } from 'socket.io-client';

interface IChatInputProps {
  scrollRef:any;
  socket: Socket | null;
}

const ChatInput = ({scrollRef, socket}:IChatInputProps) => {
  const [uploadImg,setUploadImg]=useState<File | null>(null);
  const {getRootProps,getInputProps,isDragActive}= useDropzone({
    accept:'image/*' as unknown as Accept,
    onDrop:(acceptedFiles)=>{
       setUploadImg(acceptedFiles[0]);
    },
  })
  const [showEmojiPicker,setShowEmojiPicker]=useState(false);
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
      const handleEmojiClick=(emoji:any)=>{
        setInput(prev=>prev+emoji.emoji);
      }
      useEffect(()=>{
        const handleClickOutside=(e:MouseEvent)=>{
          const event=e.target as Element;
          if(!event.closest('.EmojiPickerReact') && !event.closest('#emoji-pick')) {
            setShowEmojiPicker(false);
          }
        }
        document.addEventListener('click',handleClickOutside);
        return ()=>{
          document.removeEventListener('click',handleClickOutside);
        }
      },[])
  return (
    <ChatInputContainer>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        rows={2}
        sx={{ width: '100%', flexGrow:1 }}
        multiline
      />
       {uploadImg && <ImageContainer>
      <img width={80} height={80} src={URL.createObjectURL(uploadImg as File)} alt="" />
    </ImageContainer> }
      <IconButton id='emoji-pick' onClick={()=>setShowEmojiPicker(prev=>!prev)}  sx={{alignSelf:'center'}}>
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick}/> }  
        <EmojiEmotions/>
      </IconButton>
      <IconButton {...getRootProps()}  sx={{alignSelf:'center'}}>
        <InsertPhoto/>
      </IconButton>
      <input type="file" {...getInputProps()} />
      <LoadingButton
        onClick={() => {
          dispatch(
            sendMessage({
              text: input,
            chatId: currentChat?.chat.id as string,
            receiverId: recipient as string,
              onSuccess:(message:any)=>{
                socket?.emit('send-message',message);
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
        startIcon={<Send />}
      >
      </LoadingButton>
    </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  width: 100%;
  display:flex;
`;

const ImageContainer=styled.div`
  padding:5px;

`

export default ChatInput;
