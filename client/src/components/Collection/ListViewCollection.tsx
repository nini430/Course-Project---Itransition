import { Delete, Edit } from '@mui/icons-material';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
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
import {
  Collection,
  Collection as CollectionType,
} from '../../types/collection';
import NoImage from '../../assets/no-image.png';
import AvatarComp from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/store';

interface IListViewCollectionProps {
  collection: CollectionType;
  setIsConfirmDialogOpen: Dispatch<SetStateAction<Collection>>;
}

const ListViewCollection = ({
  collection,
  setIsConfirmDialogOpen,
}: IListViewCollectionProps) => {
  const { t } = useTranslation();
  const { authedUser } = useAppSelector((state) => state.auth);
  return (
    <StyledCard sx={{ minHeight: '330px' }}>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/collection/${collection.id}`}
      >
        <CardContent
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr auto auto',
            gridGap: '4px',
          }}
        >
          <LeftContent>
            <Typography sx={{ fontSize: 20 }}>{collection.name}</Typography>
            <CollectionImg src={collection.image || NoImage} alt="" />
          </LeftContent>
          <RightContent>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography sx={{ color: 'gray' }}>
                {t('common.topic')}:{' '}
              </Typography>
              <Typography>{collection.topic}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography sx={{ color: 'gray' }}>
                {t('common.description')}
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: collection.description.slice(0, 800),
                }}
              />
            </Box>
            {authedUser &&
              (collection?.author?.id === authedUser?.id ||
                authedUser?.role === 'ADMIN') && (
                <CrudBtnContainer>
                  <Link
                    to={`/edit-collection/${collection?.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <IconButton
                      sx={{ alignItems: 'flex-start', height: '40px' }}
                    >
                      <Edit />
                    </IconButton>
                  </Link>

                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      setIsConfirmDialogOpen(collection);
                    }}
                    sx={{ alignItems: 'flex-start', height: '40px' }}
                  >
                    <Delete />
                  </IconButton>
                </CrudBtnContainer>
              )}
          </RightContent>
        </CardContent>
      </Link>
      <Link
        to={`/profile/${collection.author.id}`}
        style={{ textDecoration: 'none' }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <Typography sx={{ color: 'gray' }}>{t('common.author')}: </Typography>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <AvatarComp
              width={40}
              height={40}
              src={collection.author.profileImage || AvatarImg}
            />
            <Typography sx={{ color: 'gray' }}>
              {collection.author.firstName} {collection.author.lastName}{' '}
            </Typography>
          </Box>
        </Box>
      </Link>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          to={`/collection/${collection.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Button fullWidth sx={{ border: '1px solid gray' }}>
            {t('common.view_more')}
          </Button>
        </Link>
      </CardActions>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  min-height: 400px !important;
`;

const CollectionImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;
const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CrudBtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default ListViewCollection;
