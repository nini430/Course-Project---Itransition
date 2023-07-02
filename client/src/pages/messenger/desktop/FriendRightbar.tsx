import React, { useEffect } from 'react'
import { styled } from 'styled-components';
import ChatOnline from '../../../components/Chat/ChatOnline';
import { Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getMyFollows } from '../../../store/chatReducer';

const FriendRightbar = () => {
  const dispatch=useAppDispatch();
  const {chatFollows}=useAppSelector(state=>state.chat);
  useEffect(()=>{
    dispatch(getMyFollows())
  },[dispatch])
  return (
    <RightBarContainer>
      <Typography>12 online friends</Typography>
      {chatFollows && chatFollows.map(item=>(
        <ChatOnline  memberId={item.follower.id}  fullName={`${item.follower.firstName} ${item.follower.lastName}`}/>
      ))}
      
      
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