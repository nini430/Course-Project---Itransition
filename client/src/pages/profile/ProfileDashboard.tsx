import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';
import { List, GridView, AddCircle, Download } from '@mui/icons-material';
import { useState } from 'react';
import {Toaster,toast} from 'react-hot-toast'
import {CSVLink} from 'react-csv'

import { useAppDispatch, useAppSelector } from '../../store/store';
import Collection from '../../components/Collection/GridViewCollection';
import ListViewCollection from '../../components/Collection/ListViewCollection';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { removeCollection } from '../../store/collectionReducer';
import toastOptions from '../../utils/toastOptions';
import { Collection as CollectionType } from '../../types/collection';



const ProfileDashboard = () => {
  const dispatch=useAppDispatch();
  const [isConfirmDialogOpen,setIsConfirmDialogOpen]=useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const { myCollections, removeCollectionLoading } = useAppSelector((state) => state.collection);
  const {currentProfile}=useAppSelector(state=>state.user);
  return (

    <DashboardContainer>
      <Toaster/>
      <TopBarContainer>
      <DisplayContainer>
        <Button onClick={()=>setViewMode(prev=>prev==='grid'?'list':'grid')} sx={{ border: viewMode==='list'?'1px solid gray':''}}>
          <List fontSize="large" />
        </Button>
        <Button onClick={()=>setViewMode(prev=>prev==='grid'?'list':'grid')} sx={{ border: viewMode==='grid'?'1px solid gray':'' }}>
          <GridView fontSize="large" />
        </Button>
        
      </DisplayContainer>
      <Link to='/add-collection'>
      <Button sx={{border:'1px solid gray',marginLeft:'5px'}} startIcon={<AddCircle/>}>Add Collection</Button></Link>
      
      </TopBarContainer>
      <Button startIcon={<Download/>} sx={{border:'1px solid gray',margin:'10px 0'}}>
        <CSVLink filename={`collections-${currentProfile?.firstName} ${currentProfile?.lastName}`} style={{textDecoration:'none'}} data={myCollections as CollectionType[] || []}>
        Export Collections to CSV
        </CSVLink>
      </Button>
      {!myCollections && (
        <LoadingContainer>
          <CircularProgress size={75} />
        </LoadingContainer>
      )}
      {
        myCollections?.length===0? <Typography sx={{fontSize:40}}>No Collections Yet</Typography>:
      viewMode === 'list' ? (
        <ListContainer >
          {myCollections?.map((coll)=>(
            <ListViewCollection  isConfirmDialogOpen={isConfirmDialogOpen} setIsConfirmDialogOpen={setIsConfirmDialogOpen} key={coll.id} collection={coll}/>
          ))}
        </ListContainer>
      ) : (
        <GridContainer >
          {myCollections &&
            myCollections.map((coll) => (
              <Collection  isConfirmDialogOpen={isConfirmDialogOpen} setIsConfirmDialogOpen={setIsConfirmDialogOpen} key={coll.id} collection={coll} />
            ))}
        </GridContainer>
      )}
      <ConfirmDialog onOk={(collectionId:string)=>{
        dispatch(removeCollection({collectionId,onSuccess:()=>{
          setIsConfirmDialogOpen(null);
          toast.success('collection_removed',toastOptions);
        }}));
      }} loading={removeCollectionLoading}  open={isConfirmDialogOpen} onClose={()=>setIsConfirmDialogOpen(null)}/>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  flex:1;
`;

const TopBarContainer=styled.div`
  display:flex;
  justify-content: space-between;
`

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
