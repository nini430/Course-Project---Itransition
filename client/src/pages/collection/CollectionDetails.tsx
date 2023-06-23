import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { getCollection } from '../../store/collectionReducer';
import CollectionCard from './CollectionCard';
import CollectionDashboard from './CollectionDashboard';
import Loading from '../../components/Loading/Loading';

const CollectionDetails = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
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
    <CollectionContainer isMob={isTabletOrMobile}>
      <CollectionCard currentCollection={currentCollection} />
      <CollectionDashboard currentCollection={currentCollection} />
    </CollectionContainer>
  );
};

const CollectionContainer = styled(({isMob,...rest}:any)=><div {...rest} />)`
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: ${({isMob})=>isMob?'flex':'grid'};
  grid-template-columns:${({isMob})=>isMob?'':'1fr 2fr'};
  flex-direction:${({isMob})=>isMob?'column':''};
  grid-gap:20px;
  gap:20px;
`;



export default CollectionDetails;
