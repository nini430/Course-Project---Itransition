import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Home, Collections } from '@mui/icons-material';

import { getCollection } from '../../store/collectionReducer';
import CollectionCard from './CollectionCard';
import CollectionDashboard from './CollectionDashboard';
import Loading from '../../components/Loading/Loading';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../store/store';


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
    <CollectionWrapper>
    <BreadCrumb paths={[{path:'/',title:'Home',icon:Home},{path:`/collection/${collectionId}`,title:'Collection',icon:Collections}]}/>
    <CollectionContainer isMob={isTabletOrMobile}>
      <CollectionCard currentCollection={currentCollection} />
      <CollectionDashboard currentCollection={currentCollection} />
    </CollectionContainer>
    </CollectionWrapper>
    
  );
};

const CollectionWrapper=styled.div`
  display:flex;
  flex-direction: column;
  gap:30px;
  align-items:center;
`

const CollectionContainer = styled(({isMob,...rest}:any)=><div {...rest} />)`
  width:90%;
  margin:20px;
  min-height: calc(100vh - 80px);
  display: ${({isMob})=>isMob?'flex':'grid'};
  grid-template-columns:${({isMob})=>isMob?'':'1fr 2fr'};
  flex-direction:${({isMob})=>isMob?'column':''};
  grid-gap:20px;
  gap:20px;
`;



export default CollectionDetails;
