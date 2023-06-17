import { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';

import AvatarImg from '../../assets/avatar.png';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/store';
import { logoutUser } from '../../store/authReducer';

const NavUser = () => {
  const dispatch=useAppDispatch();
    const {t}=useTranslation();
  const [anchorEl,setAnchorEl]=useState<any>(null);
  const handleAnchorClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
     setAnchorEl(e.currentTarget);
  }
  return (
    <NavUserContainer>
      <IconButton onClick={handleAnchorClick}>
        <UserImg src={AvatarImg} alt="avatar" />
      </IconButton>
      <StyledMenu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={()=>setAnchorEl(null)}
      >
        <MenuItem>
          <Settings />
        {t('nav.parameters')}
        </MenuItem>
        <MenuItem onClick={()=>dispatch(logoutUser())}>
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

const UserImg = styled.img`
  border-radius: 50%;
  width: 40px;
  height: auto;
`;

const StyledMenu = styled(Menu)`
    margin-top:15px;
`;

export default NavUser;
