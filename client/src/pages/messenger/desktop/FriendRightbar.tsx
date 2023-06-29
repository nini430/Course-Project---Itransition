import React from 'react'
import { styled } from 'styled-components';
import ChatOnline from '../../../components/Chat/ChatOnline';
import { Typography } from '@mui/material';

const FriendRightbar = () => {
  return (
    <RightBarContainer>
      <Typography>12 online friends</Typography>
      <ChatOnline fullName='ნინო გოგატიშვილი'/>
      <ChatOnline fullName='ნინო გოგატიშვილი'/>
      <ChatOnline fullName='ნინო გოგატიშვილი'/>
      <ChatOnline fullName='ნინო გოგატიშვილი'/>
    </RightBarContainer>
  )
}

const RightBarContainer=styled.div`
  display:flex;
  flex-direction:column;
  padding:10px;
  gap:15px;

`

export default FriendRightbar;