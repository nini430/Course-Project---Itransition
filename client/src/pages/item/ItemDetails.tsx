import styled from 'styled-components';
import { useEffect } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getSingleItem } from '../../store/itemReducer';
import Loading from '../../components/Loading/Loading';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { Home, FileCopy } from '@mui/icons-material';
  
const ItemDetails = () => {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const {getSingleItemLoading,currentItem}=useAppSelector(state=>state.item);

  useEffect(() => {
    dispatch(getSingleItem(itemId as string));
  }, [dispatch, itemId]);
  if(getSingleItemLoading || !currentItem) {
    return <Loading/>
  }
  return (
    <ItemContainer>
      <BreadCrumb paths={[{path:'/',icon:Home,title:'Home'},{path:`/item/${itemId}`,icon:FileCopy,title:'Item'}]}/>
      <ItemCard />
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction:column;
  gap:20px;
  justify-items: center;
  padding: 20px;
  align-items:center;
`;

export default ItemDetails;
