import { Button, Divider, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import Collection from '../components/Collection/Collection';
import Item from '../components/Item/Item';
import TagCloudComponent from '../components/TagCloud/TagCloud';
import { testAuthedRoute } from '../store/commonReducer';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { authedUser } = useAppSelector((state) => state.auth);
  const userExists = authedUser || localStorage.getItem('authed_user');

  return (
    <MainPageContainer>
      <TagCloudComponent />
      <CardContainer>
        <Typography sx={{ fontWeight: 300, fontStyle: 'italic' }} variant="h4">
          Latest items
        </Typography>
        <Divider />
        <CardWrapper>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </CardWrapper>
        {/* <Empty message="No Collections yet"/> */}
      </CardContainer>
      <CardContainer>
        <Typography sx={{ fontWeight: 300, fontStyle: 'italic' }} variant="h4">
          Top 5 Largest Collection
        </Typography>
        <Divider />
        <Link to="/add-collection">
          <StyledButton
            startIcon={<AddCircle />}
            sx={{ alignSelf: 'flex-start', border: '1px solid gray' }}
          >
            Add Collection
          </StyledButton>
        </Link>

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

const StyledButton = styled(Button)`
  border: 1px solid gray;
  transition: all 0.3s ease !important;

  &:hover {
    transform: scale(1.05) !important;
  }
`;
export default MainPage;
