import styled from 'styled-components';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Collection as CollectionType } from '../../types/collection';
import NoImage from '../../assets/no-image.png';
import { Delete, Edit } from '@mui/icons-material';
import { Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../../store/store';

interface ICollectionProps {
  collection: CollectionType;
  isConfirmDialogOpen?: boolean;
  setIsConfirmDialogOpen?: Dispatch<SetStateAction<any>>;
  main?: boolean;
}

const Collection = ({
  collection,
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  main,
}: ICollectionProps) => {
  const dispatch=useAppDispatch();
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">{collection.name}</Typography>
        <CollectionImg src={collection.image || NoImage} alt="" />
        <Typography sx={{ color: 'gray' }}>
          Topic: {collection.topic}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{
            __html: collection.description.slice(0, 25),
          }}
          sx={{ wordWrap: 'break-word' }}
        ></Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button sx={{ border: '1px solid gray' }}>View More</Button>
        {!main && setIsConfirmDialogOpen && (
          <CrudBtnContainer>
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsConfirmDialogOpen(collection);
              }}
            >
              <Delete />
            </IconButton>
          </CrudBtnContainer>
        )}
      </CardActions>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s ease !important;
`;

const CollectionImg = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

const CrudBtnContainer = styled.div`
  display: flex;
  align-items: center;
`;
export default Collection;
