import styled from 'styled-components';
import { useEffect } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { getSingleItem } from '../../store/itemReducer';
  
const ItemDetails = () => {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleItem(itemId as string));
  }, [dispatch, itemId]);
  return (
    <ItemContainer>
      <ItemCard />
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-rows: 1fr 2fr;
  justify-items: center;
  padding: 20px;
`;

export default ItemDetails;
