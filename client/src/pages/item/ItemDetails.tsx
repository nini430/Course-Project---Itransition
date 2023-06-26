import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {IconButton,Box} from '@mui/material'
import {Delete,Edit} from '@mui/icons-material'
import ItemCard from './ItemCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getSingleItem } from '../../store/itemReducer';
import Loading from '../../components/Loading/Loading';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { Home, FileCopy } from '@mui/icons-material';
import LikeComments from './LikeComments';
import { Item } from '../../types/item';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { removeItem } from '../../store/itemReducer';
  
const ItemDetails = () => {
  const navigate=useNavigate();
  const [confirmDialog,setConfirmDialog]=useState<Item | null>(null)
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const {getSingleItemLoading,currentItem,removeItemLoading}=useAppSelector(state=>state.item);
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth=authedUser || JSON.parse(localStorage.getItem('authed_user') as string);

  useEffect(() => {
    dispatch(getSingleItem(itemId as string));
  }, [dispatch, itemId]);
  if(getSingleItemLoading || !currentItem) {
    return <Loading/>
  }
  return (
    <ItemContainer>
      
      <BreadCrumb paths={[{path:'/',icon:Home,title:'Home'},{path:`/item/${itemId}`,icon:FileCopy,title:'Item'}]}/>
      <TopContainer>
      <ItemCard />
      {auth.id === currentItem?.collection.author.id && (
        <Box sx={{diaplay:'flex',alignItems:'center',gap:'10px',alignSelf:'flex-end'}}>
        <IconButton><Edit/></IconButton>
        <IconButton onClick={()=>setConfirmDialog(currentItem)}><Delete/></IconButton>
    </Box>
      )}
      </TopContainer>
      <LikeComments/>
      <ConfirmDialog onClose={()=>setConfirmDialog(null)} open={confirmDialog} loading={removeItemLoading} onOk={()=>{
        dispatch(removeItem({itemId:currentItem?.id as string,onSuccess:()=>{
          setConfirmDialog(null);
          setTimeout(()=>{
            navigate('/')
          },2000);
        }}))
      }}/>
    </ItemContainer>
  );
};

const TopContainer=styled.div`
  display:flex;
  gap:10px;
`

const ItemContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction:column;
  gap:15px;
  justify-items: center;
  padding: 20px;
  align-items:center;
`;

export default ItemDetails;
