import styled from 'styled-components'
import { useAppSelector } from '../../store/store'
import Logo from '../Logo/Logo';
import { Divider } from '@mui/material';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import LanguagePicker from '../LanguageDropDown/LanguagePicker';
import { Link } from 'react-router-dom';
import { Settings } from '@mui/icons-material';

const Sidebar = () => {
    const {isSidebarOpen,mode}=useAppSelector(state=>state.common);
  return (
    <Container mode={mode}  isSidebarOpen={isSidebarOpen}>
      <LogoContainer>
      <Logo/>
      </LogoContainer>
         <MenuContainer>
          <ModeSwitch/>
          <LanguagePicker/>
          <Link style={{textDecoration:'none'}} to='/settings'>
            <Settings/>
            Settings
          </Link>
          </MenuContainer>  
    </Container>
  )
}

const Container=styled(({isSidebarOpen,mode,...rest}:any)=><div {...rest}/>)`
    width:450px;
    left:${({isSidebarOpen})=>isSidebarOpen?0:'-450px'};
    box-shadow: 1px 10px 14px -8px rgba(0, 0, 0, 0.65);
    z-index:50;
    background:${({mode})=>mode==='light'?'white':'#7b7676'};
    position:absolute;
    top:0;
    height:100vh;
    transition:all 0.3s ease;
    display:flex;
    flex-direction:column;
`
const LogoContainer=styled.div`
  height:80px;
  width:100%;
  box-shadow: 1px 10px 14px -8px rgba(0, 0, 0, 0.25);
  display:flex;
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