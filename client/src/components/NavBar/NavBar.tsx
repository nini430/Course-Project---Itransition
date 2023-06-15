import styled from 'styled-components'
import LanguageDropDown from '../LanguageDropDown/LanguageDropDown'
import { useState } from 'react'
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import ModeSwitch from '../ModeSwitch/ModeSwitch';

const NavBar = () => {
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);
  return (
    <NavbarContainer>
        <Logo/>
        <SearchInput/>
        <RightContainer>
            <ModeSwitch/>
        <LanguageDropDown onOpen={()=>setIsSidebarOpen(true)} open={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)}/>
        </RightContainer>
       
    </NavbarContainer>
  )
}

const NavbarContainer=styled.div`
    position:sticky;
    top:0;
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
    gap:20px;
`

export default NavBar