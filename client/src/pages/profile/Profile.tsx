import {useEffect} from 'react'
import {useMediaQuery} from 'react-responsive'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getUserInformation, setAuthedUser } from '../../store/authReducer';
import ProfileCard from './ProfileCard';
import ProfileDashboard from './ProfileDashboard';

const Profile = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 850 });
  const {authedUser}=useAppSelector(state=>state.auth);
  const userExists = authedUser || localStorage.getItem('authed_user');
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(getUserInformation());
    dispatch(setAuthedUser(JSON.parse(localStorage.getItem('authed_user') as string)));
    if(userExists) {
      dispatch(setAuthedUser(JSON.parse(localStorage.getItem('authed_user') as string)))
    }
  },[dispatch])
  return (
    <ProfileContainer isMobile={isTabletOrMobile}>
        <ProfileCard/>
        <ProfileDashboard/>
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