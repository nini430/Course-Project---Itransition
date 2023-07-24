import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  AdminPanelSettings,
  Close,
  Email,
  Person2,
  Settings,
  Logout,
} from '@mui/icons-material';
import { Button, ClickAwayListener, IconButton } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/store';
import Logo from '../Logo/Logo';
import ModeSwitch from '../ModeSwitch/ModeSwitch';
import LanguagePicker from '../LanguageDropDown/LanguagePicker';
import { toggleSidebar } from '../../store/commonReducer';
import SearchInput from '../SearchInput/SearchInput';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../../store/authReducer';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const menuElement = document.getElementById('nav-dropdown-button');
  const { isSidebarOpen, mode } = useAppSelector((state) => state.common);
  const { authedUser } = useAppSelector((state) => state.auth);
  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (
          e.target &&
          menuElement &&
          !menuElement.contains(e.target as Node)
        ) {
          isSidebarOpen && dispatch(toggleSidebar());
        }
      }}
    >
      <div>
        <Container mode={mode} isSidebarOpen={isSidebarOpen}>
          <LogoContainer>
            <Logo />
            <IconButton onClick={() => dispatch(toggleSidebar())}>
              <Close />
            </IconButton>
          </LogoContainer>
          <SearchInput />
          <MenuContainer>
            <ModeSwitch />
            <LanguagePicker />
            {authedUser && (
              <>
                <Link
                  onClick={() => dispatch(toggleSidebar())}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                  to="/settings"
                >
                  <Settings />
                  {t('nav.parameters')}
                </Link>
                <Link
                  onClick={() => dispatch(toggleSidebar())}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                  to={`/profile/${authedUser?.id}`}
                >
                  <Person2 />
                  {t('nav.profile')}
                </Link>
              </>
            )}
            {authedUser && !authedUser.isEmailVerified && (
              <Link to="/verify-email" style={{ textDecoration: 'none' }}>
                <Button
                  onClick={() => {
                    dispatch(toggleSidebar());
                  }}
                  sx={{ border: '1px solid gray' }}
                  startIcon={<Email />}
                >
                  {t('auth.verify_email')}
                </Button>
              </Link>
            )}
            {authedUser && authedUser.role === 'ADMIN' && (
              <Link style={{ textDecoration: 'none' }} to="/admin">
                <Button
                  onClick={() => {
                    dispatch(toggleSidebar());
                  }}
                  startIcon={<AdminPanelSettings />}
                  sx={{ border: '1px solid gray' }}
                >
                  {t('admin.admin_area')}
                </Button>
              </Link>
            )}

            {!authedUser && (
              <Link style={{ textDecoration: 'none' }} to="/login">
                <Button
                  onClick={() => {
                    dispatch(toggleSidebar());
                  }}
                  sx={{ border: '1px solid gray' }}
                >
                  {t('auth.sign_in')}
                </Button>
              </Link>
            )}
          </MenuContainer>
          {authedUser && (
            <Button
              startIcon={<Logout />}
              onClick={() => dispatch(logoutUser())}
              sx={{ border: '1px solid #c4c4c4' }}
            >
              {t('nav.log_out')}
            </Button>
          )}
        </Container>
      </div>
    </ClickAwayListener>
  );
};

const Container = styled(({ isSidebarOpen, mode, ...rest }: any) => (
  <div {...rest} />
))`
  width: 400px;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? 0 : '-450px')};
  box-shadow: 1px 10px 14px -8px rgba(0, 0, 0, 0.65);
  background: ${({ mode }) => (mode === 'light' ? 'white' : '#7b7676')};
  position: absolute;
  top: 0;
  height: 100vh;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 50;
  align-items: center;
`;
const LogoContainer = styled.div`
  height: 80px;
  width: 100%;
  box-shadow: 1px 10px 14px -8px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  align-items: center;
`;

export default Sidebar;
