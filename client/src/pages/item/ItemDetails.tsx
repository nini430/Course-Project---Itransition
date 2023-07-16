import styled from 'styled-components';
import {Toaster,toast} from 'react-hot-toast'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box, Typography, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import ItemCard from './ItemCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  addItemReaction,
  getSingleItem,
  unreactItem,
} from '../../store/itemReducer';
import Loading from '../../components/Loading/Loading';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { Home, FileCopy } from '@mui/icons-material';
import LikeComments from './LikeComments';
import { Item } from '../../types/item';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { removeItem } from '../../store/itemReducer';
import Reaction from '../../components/Reaction/Reaction';
import { reactions } from '../../utils/reactions';
import ReactionMapper from '../../components/shared/ReactionMapper';
import {
  Reaction as ReactionType,
  ReactionMapper as ReactionMapperType,
} from '../../types/reaction';
import { useTranslation } from 'react-i18next';
import toastOptions from '../../utils/toastOptions';

const ItemDetails = () => {
  const navigate = useNavigate();
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const [confirmDialog, setConfirmDialog] = useState<Item | null>(null);
  const { getSingleItemLoading, currentItem, removeItemLoading } =
    useAppSelector((state) => state.item);
  const liked = currentItem?.reactions.find((item) => item.userId === auth?.id);
  const [isEmojiShown, setIsEmojiShown] = useState(false);
  const [animationPause, setAnimationPause] = useState(false);
  const [reactionMapper, setReactionMapper] = useState<
    null | ReactionMapperType[]
  >(null);
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const {t}=useTranslation();

  useEffect(() => {
    dispatch(getSingleItem(itemId as string));
  }, [dispatch, itemId]);

 
  if (getSingleItemLoading || !currentItem) {
    return <Loading />;
  }
  return (
    <ItemContainer>
      <Toaster/>
      <BreadCrumb
        paths={[
          { path: '/', icon: Home, title: t('breadcrumb.home') },
          { path: `/item/${itemId}`, icon: FileCopy, title: t('breadcrumb.item') },
        ]}
      />
      <TopContainer>
        <ItemCard />
        {auth?.id === currentItem?.collection.author?.id && (
          <Box
            sx={{
              diaplay: 'flex',
              alignItems: 'center',
              gap: '10px',
              alignSelf: 'flex-end',
            }}
          >
            <Link
              to={`/edit-item/${currentItem.id}/${currentItem.collectionId}`}
              style={{ textDecoration: 'none' }}
            >
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
            <IconButton onClick={() => setConfirmDialog(currentItem)}>
              <Delete />
            </IconButton>
          </Box>
        )}
      </TopContainer>
      <LikeWrapper>
        <LikeContainer
          onMouseOver={() => setIsEmojiShown(true)}
          onMouseOut={() => setIsEmojiShown(false)}
        >
          {liked ? (
            <Button
              onClick={() => {
                dispatch(unreactItem({ reactionId: (liked as any).id }));
              }}
            >
              <Typography sx={{ fontSize: 28 }}>
                {reactions.find((react) => react.name === liked.name)?.emoji}
              </Typography>
            </Button>
          ) : (
            <IconButton
              onClick={() => {
                dispatch(
                  addItemReaction({
                    itemId: currentItem.id,
                    input: { name: 'like' },
                  })
                );
              }}
            >
              👍
            </IconButton>
          )}

          {isEmojiShown && (
            <Reaction
              animationPause={animationPause}
              setAnimationPause={setAnimationPause}
              setIsEmojiShown={setIsEmojiShown}
              bottomPx="35px"
              emojiSize={28}
              action={(name: string) => {
                dispatch(
                  addItemReaction({ itemId: currentItem.id, input: { name } })
                );
              }}
            />
          )}
        </LikeContainer>
        <Typography>
          <span
            onClick={() =>
              setReactionMapper(
                currentItem.reactions.map((item) => ({
                  user: item.user,
                  emoji: item.name,
                  id: item.id,
                }))
              )
            }
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {currentItem.reactions.length}
          </span>{' '}
          Reaction(s)
        </Typography>
      </LikeWrapper>

      <LikeComments />
      <ConfirmDialog
        onClose={() => setConfirmDialog(null)}
        open={confirmDialog}
        loading={removeItemLoading}
        onOk={() => {
          dispatch(
            removeItem({
              itemId: currentItem?.id as string,
              onSuccess: (message:string) => {
                setConfirmDialog(null);
                toast.success(t(`messages.${message||'success'}`),toastOptions);
                setTimeout(() => {
                  navigate('/');
                }, 2000);
              },
            })
          );
        }}
      />
      <ReactionMapper
        open={reactionMapper as ReactionMapperType[]}
        onClose={() => setReactionMapper(null)}
      />
    </ItemContainer>
  );
};

const LikeContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;

const TopContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
`;

const ItemContainer = styled.div`
  width:100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-items: center;
  padding: 20px;
  align-items: center;
  overflow-x:hidden;
`;

const LikeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export default ItemDetails;
