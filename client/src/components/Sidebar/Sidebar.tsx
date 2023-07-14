import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Close, Person2, Settings } from '@mui/icons-material';
import {ClickAwayListener, IconButton} from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../store/store'
import Logo from '../Logo/Logo';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import LanguagePicker from '../LanguageDropDown/LanguagePicker';
import { toggleSidebar } from '../../store/commonReducer';


const Sidebar = () => {
  const dispatch=useAppDispatch();
  const menuElement=document.getElementById('nav-dropdown-button')
    const {isSidebarOpen,mode}=useAppSelector(state=>state.common);
    const {authedUser}=useAppSelector(state=>state.auth);
  return (
    <ClickAwayListener onClickAway={e=>{
      if(e.target && menuElement && !menuElement.contains(e.target as Node) ) {
        isSidebarOpen && dispatch(toggleSidebar())
      }
    }}>
      <div>
      <Container  mode={mode}  isSidebarOpen={isSidebarOpen}>
      <LogoContainer>
      <Logo/>
      <IconButton onClick={()=>dispatch(toggleSidebar())}>
        <Close/>
      </IconButton>
      </LogoContainer>
         <MenuContainer>
          <ModeSwitch/>
          <LanguagePicker/>
          {authedUser && (
            <>
            <Link onClick={()=>dispatch(toggleSidebar())} style={{textDecoration:'none'}} to='/settings'>
            <Settings/>
            Settings
          </Link>
          <Link onClick={()=>dispatch(toggleSidebar())} style={{textDecoration:'none'}} to={`/profile/${authedUser?.id}`}>
            <Person2/>
            Profile
          </Link>
            </>
          )}
          </MenuContainer>  
    </Container>
      </div>
     
    </ClickAwayListener>
    
  )
}

const Container=styled(({isSidebarOpen,mode,...rest}:any)=><div {...rest}/>)`
    width:400px;
    left:${({isSidebarOpen})=>isSidebarOpen?0:'-450px'};
    box-shadow: 1px 10px 14px -8px rgba(0, 0, 0, 0.65);
    background:${({mode})=>mode==='light'?'white':'#7b7676'};
    position:absolute;
    top:0;
    height:100vh;
    transition:all 0.3s ease;
    display:flex;
    flex-direction:column;
    z-index:50;
`
const LogoContainer=styled.div`
  height:80px;
  width:100%;
  box-shadow: 1px 10px 14px -8px rgba(0, 0, 0, 0.25);
  display:flex;
  justify-content:space-between;
  padding: 0 10px;
  align-items:center;
`

const MenuContainer=styled.div`
  display:flex;
  flex-direction: column;
  gap:10px;
  padding:20px;
  align-items:center;
`

export default Sidebar;