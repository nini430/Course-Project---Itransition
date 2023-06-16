import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {useMediaQuery} from 'react-responsive'
import {Button, IconButton} from '@mui/material'
import {Menu,MenuOpen} from '@mui/icons-material'
import MobileNavDropDown from '../MobileNavDropDown/MobileNavDropDown'

import LanguageDropDown from '../LanguageDropDown/LanguagePicker'
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import NavUser from '../NavUser/NavUser';
import { useAppSelector } from '../../store/store'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const {t}=useTranslation();
  const {authedUser}=useAppSelector(state=>state.auth);
  const userExists=authedUser || localStorage.getItem('authed_user');
  const [dropdownOpen,setDropdownOpen]=useState(false);
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  if(isExtraSmallDevice) {
    return (
      <NavbarContainer>
       {dropdownOpen && <MobileNavDropDown/> } 
        <IconButton onClick={()=>setDropdownOpen(prev=>!prev)}>
          {dropdownOpen ? <MenuOpen/> : <Menu/>}
        </IconButton>
        <SearchInput/>
         <Logo/>
         
      </NavbarContainer>
    )
  }else{
    return (
      <NavbarContainer>
          <Logo/>
          <SearchInput/>
          <RightContainer>
              <ModeSwitch/>
          <LanguageDropDown />
         {userExists ? <NavUser/> : <Link to='/login'><Button sx={{border:'1px solid gray'}}>{t('auth.login')}</Button></Link> } 
          </RightContainer>
         
      </NavbarContainer>
    )
  }
  
}

const NavbarContainer=styled.div`
    height:80px; 
    border-bottom:1px solid gray;
    display:flex;
    align-items: center;
    padding:0 10px;
    justify-content: space-between;
    position:relative;
`

const RightContainer=styled.div`
    display:flex;
    align-items:center;
    gap:50px;
`

export default NavBar