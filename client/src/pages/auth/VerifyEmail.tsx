import styled from 'styled-components';
import { Divider, Paper, Typography } from '@mui/material';
import Email from '../../assets/email.png';
import { useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { authedUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);
  return (
    <Container>
      <StyledPaper sx={{ padding: '40px' }} elevation={5}>
        <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>
          Email verification link is sent to the Email - {authedUser?.email}
        </Typography>
        <Divider />
        <EmailImg src={Email} />
        <Typography>
          Please check your E-mail and follow the link to verify your account
        </Typography>
      </StyledPaper>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 80px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: column;
`;

const EmailImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export default VerifyEmail;
