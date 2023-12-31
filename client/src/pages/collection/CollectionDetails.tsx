import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, Collections } from '@mui/icons-material';

import { getCollection } from '../../store/collectionReducer';
import CollectionCard from './CollectionCard';
import CollectionDashboard from './CollectionDashboard';
import Loading from '../../components/Loading/Loading';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useTranslation } from 'react-i18next';
import useResponsive from '../../hooks/useResponsive';

const CollectionDetails = () => {
  const { t } = useTranslation();
  const { md } = useResponsive();
  const { collectionId } = useParams();
  const dispatch = useAppDispatch();
  const { currentCollection, getCollectionLoading } = useAppSelector(
    (state) => state.collection
  );

  useEffect(() => {
    dispatch(getCollection(collectionId as string));
  }, [dispatch, collectionId]);

  if (getCollectionLoading || !currentCollection) {
    return <Loading />;
  }
  return (
    <CollectionWrapper>
      <BreadCrumb
        paths={[
          { path: '/', title: t('breadcrumb.home'), icon: Home },
          {
            path: `/collection/${collectionId}`,
            title: t('item.collection'),
            icon: Collections,
          },
        ]}
      />
      <CollectionContainer isMob={md}>
        <CollectionCard currentCollection={currentCollection} />
        <CollectionDashboard currentCollection={currentCollection} />
      </CollectionContainer>
    </CollectionWrapper>
  );
};

const CollectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  width: 100vw;
  overflow-x: hidden;
`;

const CollectionContainer = styled(({ isMob, ...rest }: any) => (
  <div {...rest} />
))`
  width: 90%;
  margin: 20px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default CollectionDetails;
