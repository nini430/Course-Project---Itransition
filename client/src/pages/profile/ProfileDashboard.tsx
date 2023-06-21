import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import { List, GridView } from '@mui/icons-material';
import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import Collection from '../../components/Collection/GridViewCollection';
import ListViewCollection from '../../components/Collection/ListViewCollection';

const ProfileDashboard = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const { myCollections } = useAppSelector((state) => state.auth);
  return (

    <DashboardContainer>
      <DisplayContainer>
        <Button onClick={()=>setViewMode(prev=>prev==='grid'?'list':'grid')} sx={{ border: viewMode==='list'?'1px solid gray':''}}>
          <List fontSize="large" />
        </Button>
        <Button onClick={()=>setViewMode(prev=>prev==='grid'?'list':'grid')} sx={{ border: viewMode==='grid'?'1px solid gray':'' }}>
          <GridView fontSize="large" />
        </Button>
      </DisplayContainer>
      {!myCollections && (
        <LoadingContainer>
          <CircularProgress size={75} />
        </LoadingContainer>
      )}
      {viewMode === 'list' ? (
        <ListContainer>
          {myCollections?.map((coll)=>(
            <ListViewCollection collection={coll}/>
          ))}
        </ListContainer>
      ) : (
        <GridContainer>
          {myCollections &&
            myCollections.map((coll) => (
              <Collection key={coll.id} collection={coll} />
            ))}
        </GridContainer>
      )}
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`

`;

const DisplayContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
   max-height: calc(100vh - 250px);
 overflow-y:auto;
 display:flex;
 flex-direction:column;
 gap:10px;
`;

const GridContainer = styled.div`
 max-height: calc(100vh - 250px);
 overflow-y:auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export default ProfileDashboard;
