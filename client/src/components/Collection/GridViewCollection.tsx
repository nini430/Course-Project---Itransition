import styled from 'styled-components';
import {
  Box,
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
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png'

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
    <Link style={{textDecoration:'none'}} to={`/collection/${collection.id}`}>
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
        <Link to={`/profile/${collection?.author?.id}`} style={{textDecoration:'none'}}>
        <Box sx={{display:'flex',alignItems:'center',gap:'5px'}}>
        <Typography sx={{ color: 'gray' }}>
          Author:
        </Typography>
        <Avatar width={30} height={30} src={collection.author?.profileImage || AvatarImg}/>
        <Typography>
        {collection.author?.firstName} {collection.author?.lastName}
        </Typography>
        </Box>
        </Link>
        
         
      </CardContent>
      <CardActions sx={{ gap:'10px' }}>
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
    </Link>
    
  );
};

const StyledCard = styled(Card)`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  align-items:center;
  transition: all 0.3s ease !important;
`;

const CollectionImg = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

const CrudBtnContainer = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
`;
export default Collection;
