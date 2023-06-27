import styled from 'styled-components';
import moment from 'moment';
import {useState} from 'react'
import { Box, IconButton, Card, Typography} from '@mui/material';
import ShowMore from 'react-show-more';
import {Toaster} from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../store/store';
import Avatar from '../../components/Avatar/Avatar';
import NoPhoto from '../../assets/no-image.png';
import AvatarImg from '../../assets/avatar.png';
import Loading from '../../components/Loading/Loading';
import { removeItem } from '../../store/itemReducer';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/shared/ConfirmDialog';

const ItemCard = () => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const { currentItem } = useAppSelector((state) => state.item);
  return (
    <StyledCard>
      <Toaster/>
      <Typography sx={{ textAlign: 'center' }}>{currentItem?.name}</Typography>
      <GridContainer>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography sx={{ color: 'gray' }}>Tags:</Typography>
        <Typography>
          {currentItem?.tags.split(',').map((item) => `#${item}`)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography sx={{ color: 'gray' }}>Reactions:</Typography>
        <Typography>
          21
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography sx={{ color: 'gray' }}>Comments:</Typography>
        <Typography>
          19
        </Typography>
      </Box>
      </GridContainer>
      
     

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography sx={{ color: 'gray' }}>Collection:</Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar
            width={40}
            height={40}
            src={currentItem?.collection.image || NoPhoto}
          />
          <Typography>{currentItem?.collection.name}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography sx={{ color: 'gray' }}>Author:</Typography>
        <Box sx={{ display: 'flex',  gap: '10px' }}>
          <Avatar
            width={40}
            height={40}
            src={currentItem?.collection.author.profileImage || AvatarImg}
          />
          <Typography>
            {currentItem?.collection.author.firstName}{' '}
            {currentItem?.collection.author.lastName}
          </Typography>
        </Box>
      </Box>
      <CustomFieldsContainer>
        <Typography sx={{ color: 'gray' }}>Custom Fields:</Typography>
        {currentItem?.customFieldValues ? (
          Object.entries(currentItem?.customFieldValues)?.map(
            ([key, value]) => (
              <Box
                key={key}
                sx={{ display: 'flex', gap: '10px' }}
              >
                <Typography sx={{ color: 'gray' }}>{key}:</Typography>
                <Typography>
                  {(value as any).type === 'date' ? (
                    moment((value as any).value).format('L')
                  ) : (value as any).type === 'boolean' ? (
                    (value as any).value === true ? (
                      'Yes'
                    ) : (
                      'No'
                    )
                  ) : (value as any).type === 'multiline' ? (
                    <ShowMore less='Show Less' more='Show More' lines={3}>{(value as any).value}</ShowMore>
                  ) : (
                    (value as any)?.value
                  )}
                </Typography>
              </Box>
            )
          )
        ) : (
          <Loading />
        )}
      </CustomFieldsContainer>
      
      
      
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  max-width: 400px;
  overflow-x:auto !important;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  max-height:700px;
  overflow-y:auto !important;
`;

const CustomFieldsContainer = styled.div`
  display: flex;
  flex-wrap:wrap;
  gap:20px;
`;

const GridContainer=styled.div`
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-gap:10px;
`

export default ItemCard;
