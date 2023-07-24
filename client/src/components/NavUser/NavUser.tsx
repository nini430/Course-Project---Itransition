import { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Settings, Logout, Person2 } from '@mui/icons-material';

import AvatarImg from '../../assets/avatar.png';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logoutUser } from '../../store/authReducer';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import routesPath from '../../utils/routes';

const NavUser = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { authedUser } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const handleAnchorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <NavUserContainer>
      <IconButton onClick={handleAnchorClick}>
        <Avatar
          width="40px"
          height="40px"
          src={authedUser?.profileImage || AvatarImg}
        />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Link style={{ textDecoration: 'none' }} to={routesPath.settings}>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Settings />
            {t('nav.parameters')}
          </MenuItem>
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to={`/profile/${authedUser?.id}`}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Person2 />
            {t('nav.profile')}
          </MenuItem>
        </Link>

        <MenuItem onClick={() => dispatch(logoutUser())}>
          <Logout />
          {t('nav.log_out')}
        </MenuItem>
      </StyledMenu>
    </NavUserContainer>
  );
};

const NavUserContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const StyledMenu = styled(Menu)`
  margin-top: 15px;
`;

export default NavUser;
