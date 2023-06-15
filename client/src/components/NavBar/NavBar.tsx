import styled from 'styled-components'
import LanguageDropDown from '../LanguageDropDown/LanguagePicker'
import { useState } from 'react'
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import NavUser from '../NavUser/NavUser';

const NavBar = () => {
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

const NavbarContainer=styled.div`
    width:100vw;
    height:80px; 
    border-bottom:1px solid gray;
    display:flex;
    align-items: center;
    padding:0 10px;
    justify-content: space-between;
`

const RightContainer=styled.div`
    display:flex;
    align-items:center;
    gap:50px;
`

export default NavBar