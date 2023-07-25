import styled from 'styled-components';
import { Box, Button, Paper, Typography } from '@mui/material';
import EmailSuccessImg from '../../assets/email_success.png';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { verifyEmailAction } from '../../store/authReducer';

const EmailVerificationSuccess = () => {
  const { token } = useParams();
  const { search } = useLocation();
  const { authedUser } = useAppSelector((state) => state.auth);
  const userId = search.split('=')[1];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  useEffect(() => {
    dispatch(
      verifyEmailAction({
        userId: userId as string,
        token: token as string,
        onSuccess: (expired: boolean) => {
          if (expired) {
            navigate('/expired');
          }
        },
      })
    );
  }, [dispatch, navigate, token, userId]);
  return (
    <Container>
      <StyledPaper>
        <Typography sx={{ fontSize: 28, color: 'green' }}>
          Email Verified Succesfully!
        </Typography>
        <EmailImg src={EmailSuccessImg} />
        <Link style={{ textDecoration: 'none' }} to="/">
          <Button fullWidth sx={{ border: '1px solid green' }}>
            Go Back
          </Button>
        </Link>
      </StyledPaper>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Box)`
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const EmailImg = styled.img``;

export default EmailVerificationSuccess;
