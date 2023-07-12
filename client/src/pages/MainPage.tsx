import { Button, Divider, Typography, CircularProgress } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import Collection from '../components/Collection/GridViewCollection';
import Item from '../components/Item/Item';
import Empty from '../components/Empty/Empty';
import TagCloudComponent from '../components/TagCloud/TagCloud';
import { useEffect } from 'react';
import { getLatestItems } from '../store/itemReducer';
import { getLargestCollections } from '../store/collectionReducer';
import { Collection as CollectionType } from '../types/collection';
import { setAuthedUser } from '../store/authReducer';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const {t}=useTranslation();
  const dispatch = useAppDispatch();
  const { authedUser } = useAppSelector((state) => state.auth);
  const { getLatestItemsLoading, latestItems } = useAppSelector(
    (state) => state.item
  );
  const { getLargestCollectionsLoading, largestCollections } = useAppSelector(
    (state) => state.collection
  );
  const userExists = authedUser || localStorage.getItem('authed_user');
  useEffect(() => {
    dispatch(getLatestItems());
    dispatch(getLargestCollections());
    if (userExists) {
      dispatch(
        setAuthedUser(JSON.parse(localStorage.getItem('authed_user') as string))
      );
    }
  }, [dispatch]);
  return (
    <MainPageContainer>
      <TagCloudComponent />
      <CardContainer>
        <Typography sx={{ fontWeight: 300, fontStyle: 'italic' }} variant="h4">
          {t('home.latest_items')}
        </Typography>
        <Divider />
        {getLatestItemsLoading || !latestItems ? (
          <LoadingContainer>
            <CircularProgress size={75} />
          </LoadingContainer>
        ) : latestItems?.length === 0 ? (
          <Empty message={t('home.no_items_yet')} />
        ) : (
          <CardWrapper>
            {latestItems.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </CardWrapper>
        )}
      </CardContainer>
      <CardContainer>
        <Typography sx={{ fontWeight: 300, fontStyle: 'italic' }} variant="h4">
        {t('home.largest_collections')}
        </Typography>
        <Divider />
        {getLargestCollectionsLoading || !largestCollections ? (
          <LoadingContainer>
            <CircularProgress size={75} />
          </LoadingContainer>
        ) : largestCollections?.length === 0 ? (
          <Empty message={t('home.no_collections_yet')} />
        ) : (
          <CardWrapper>
            {largestCollections.map((collection: CollectionType) => (
              <Collection main collection={collection} key={collection.id} />
            ))}
          </CardWrapper>
        )}
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
  width:100vw;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default MainPage;
