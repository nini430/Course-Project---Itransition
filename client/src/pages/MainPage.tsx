import { Divider, Typography } from '@mui/material';
import styled from 'styled-components';

import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import Collection from '../components/Collection/Collection';
import Item from '../components/Item/Item';
import TagCloudComponent from '../components/TagCloud/TagCloud';

const MainPage = () => {
  const navigate = useNavigate();
  const { authedUser } = useAppSelector((state) => state.auth);
  const userExists = authedUser || localStorage.getItem('authed_user');

  return (
    <MainPageContainer>
      <TagCloudComponent/>
      <CardContainer>
        <Typography sx={{ fontWeight: 300, fontStyle: 'italic' }} variant="h4">
          Latest items
        </Typography>
        <Divider />
        <CardWrapper>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
        </CardWrapper>
      </CardContainer>
      <CardContainer>
        <Typography sx={{ fontWeight: 300, fontStyle: 'italic' }} variant="h4">
          Top 5 Largest Collection
        </Typography>
        <Divider />
        <CardWrapper>
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
        </CardWrapper>
      </CardContainer>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  min-height: calc(100vh - 80px);
  gap: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;
export default MainPage;
