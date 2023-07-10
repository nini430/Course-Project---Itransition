import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, IconButton } from '@mui/material';
import {
  Menu,
  MenuOpen,
  Message,
  AdminPanelSettings,
  Email
} from '@mui/icons-material';
import {Toaster} from 'react-hot-toast'

import LanguageDropDown from '../LanguageDropDown/LanguagePicker';
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import NavUser from '../NavUser/NavUser';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useTranslation } from 'react-i18next';
import { verifyEmail } from '../../store/authReducer';
import { toggleSidebar } from '../../store/commonReducer';

const NavBar = () => {
  const {isSidebarOpen}=useAppSelector(state=>state.common);
  const { t } = useTranslation();
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const userExists = authedUser || localStorage.getItem('authed_user');
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 800 });
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      console.log(e.target);
      if (
        !e.target.closest('#mobile-navbar-dropdown') &&
        !e.target.closest('#nav-dropdown-button')
      ) {
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  if (isExtraSmallDevice) {
    return (
      <NavbarContainer isSidebarOpen={isSidebarOpen}>
        <Toaster/>
        <IconButton
          id="nav-dropdown-button"
          onClick={() => dispatch(toggleSidebar())}
        >
          {isSidebarOpen ? (
            <MenuOpen sx={{ pointerEvents: 'none' }} />
          ) : (
            <Menu sx={{ pointerEvents: 'none' }} />
          )}
        </IconButton>
      </NavbarContainer>
    );
  } else {
    return (
      <NavbarContainer>
        <Toaster/>
        <Logo />
        <SearchInput />
        <RightContainer>
          <Link to="/messenger">
            <IconButton>
              <Message />
            </IconButton>
          </Link>
          {auth?.role === 'ADMIN' && (
            <Link to="/admin">
              <Button
                sx={{ textTransform: 'capitalize', border: '1px solid gray' }}
              >
                <AdminPanelSettings />
                Admin Area
              </Button>
            </Link>
          )}

          {auth && !auth?.isEmailVerified && (
            <Button onClick={()=>{
              dispatch(verifyEmail({userId:auth.id,onSuccess:()=>{
                navigate('/verify-email')
              }}))
            }} startIcon={<Email/>} sx={{border:'1px solid gray'}}>Verify Email</Button>
          ) }

          <ModeSwitch />
          <LanguageDropDown />
          {userExists ? (
            <NavUser />
          ) : (
            <Link to="/login">
              <Button sx={{ border: '1px solid gray', width: '130px' }}>
                {t('auth.login')}
              </Button>
            </Link>
          )}
        </RightContainer>
      </NavbarContainer>
    );
  }
};

const NavbarContainer = styled(({isSidebarOpen,...rest}:any)=><div {...rest} />)`
  height: 80px;
  margin-left:${({isSidebarOpen})=>isSidebarOpen?'450px':'0px'};
  box-shadow: 1px 10px 14px -8px rgba(0, 0, 0, 0.26);
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  transition:all 0.3s ease;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

export default NavBar;
