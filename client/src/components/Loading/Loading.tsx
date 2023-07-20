import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress size={75} />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
