import styled from 'styled-components'
import {useState} from 'react'
import {useMediaQuery} from 'react-responsive'
import {IconButton} from '@mui/material'
import {Menu,MenuOpen} from '@mui/icons-material'
import MobileNavDropDown from '../MobileNavDropDown/MobileNavDropDown'

import LanguageDropDown from '../LanguageDropDown/LanguagePicker'
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import NavUser from '../NavUser/NavUser';

const NavBar = () => {
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
          <NavUser/>
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