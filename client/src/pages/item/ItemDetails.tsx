import styled from 'styled-components';
import { useEffect } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getSingleItem } from '../../store/itemReducer';
import Loading from '../../components/Loading/Loading';
  
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
      <ItemCard />
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-rows: 1fr 2fr;
  justify-items: center;
  padding: 20px;
`;

export default ItemDetails;
