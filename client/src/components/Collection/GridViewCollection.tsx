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
import { useAppSelector } from '../../store/store';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png';
import { useTranslation } from 'react-i18next';

interface ICollectionProps {
  collection: CollectionType;
  setIsConfirmDialogOpen?: Dispatch<SetStateAction<CollectionType>>;
  main?: boolean;
}

const Collection = ({
  collection,
  setIsConfirmDialogOpen,
  main,
}: ICollectionProps) => {
  const { authedUser } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  return (
    <StyledCard>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/collection/${collection.id}`}
      >
        <CardContent>
          <Typography variant="h6">{collection.name}</Typography>
          <CollectionImg src={collection.image || NoImage} alt="" />
          <Typography sx={{ color: 'gray' }}>
            {t('common.topic')}: {collection.topic}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{
              __html: collection.description.slice(0, 25),
            }}
            sx={{ wordWrap: 'break-word' }}
          ></Typography>
        </CardContent>
      </Link>
      <Link
        to={`/profile/${collection?.author?.id}`}
        style={{ textDecoration: 'none' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>{t('common.author')}:</Typography>
          <Avatar
            width={30}
            height={30}
            src={collection.author?.profileImage || AvatarImg}
          />
          <Typography>
            {collection.author?.firstName} {collection.author?.lastName}
          </Typography>
        </Box>
      </Link>
      <CardActions sx={{ gap: '10px' }}>
        <Link
          style={{ textDecoration: 'none' }}
          to={`/collection/${collection.id}`}
        >
          <Button sx={{ border: '1px solid gray' }}>
            {t('common.view_more')}
          </Button>
        </Link>
        {!main &&
          setIsConfirmDialogOpen &&
          authedUser &&
          (collection.author.id === authedUser.id ||
            authedUser.role === 'ADMIN') && (
            <CrudBtnContainer>
              <Link
                to={`/edit-collection/${collection.id}`}
                style={{ textDecoration: 'none' }}
              >
                <IconButton>
                  <Edit />
                </IconButton>
              </Link>

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
  align-items: center;
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
