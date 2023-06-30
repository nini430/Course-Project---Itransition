import {useEffect,useState} from 'react'
import {useMediaQuery} from 'react-responsive'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {  getFollows, setAuthedUser } from '../../store/authReducer';
import { getMyCollections } from '../../store/collectionReducer';
import ProfileCard from './ProfileCard';
import ProfileDashboard from './ProfileDashboard';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const {userId}=useParams();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 850 });
  const {authedUser}=useAppSelector(state=>state.auth);
  const userExists = authedUser || localStorage.getItem('authed_user');
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(getMyCollections(userId as string));
    dispatch(getFollows())
    dispatch(setAuthedUser(JSON.parse(localStorage.getItem('authed_user') as string)));
    if(userExists) {
      dispatch(setAuthedUser(JSON.parse(localStorage.getItem('authed_user') as string)))
    }
  },[dispatch,userId])
  return (
    <ProfileContainer isMobile={isTabletOrMobile}>
        <ProfileCard/>
        <ProfileDashboard />
    </ProfileContainer>
  )
}

const ProfileContainer=styled(({isMobile,...rest}:any)=><div {...rest}/>)`
    max-width:100vw;
    min-height:calc(100vh - 80px);
    padding:20px;
    display:${({isMobile})=>isMobile?'flex':'grid'};
    grid-template-columns:${({isMobile})=>!isMobile?'1fr 2fr':''};
    align-items:${({isMobile})=>isMobile?'center':'flex-start'};
    flex-direction:${({isMobile})=>isMobile?'column':''};
    gap:20px;
    overflow:hidden;
`

export default Profile;