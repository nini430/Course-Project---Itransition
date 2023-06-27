import styled from 'styled-components';
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

const ItemDetails = () => {
  const navigate = useNavigate();
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const [confirmDialog, setConfirmDialog] = useState<Item | null>(null);
  const { getSingleItemLoading, currentItem, removeItemLoading } =
    useAppSelector((state) => state.item);
  const [liked, setLiked] = useState<null | ReactionType | undefined>(
    currentItem?.reactions.find((item) => item.userId === auth.id)
  );
  const [isEmojiShown, setIsEmojiShown] = useState(false);
  const [animationPause, setAnimationPause] = useState(false);
  const [reactionMapper, setReactionMapper] = useState<
    null | ReactionMapperType[]
  >(null);
  const { itemId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleItem(itemId as string));
  }, [dispatch, itemId]);

  useEffect(() => {
    if (currentItem) {
      setLiked(currentItem?.reactions.find((item) => item.userId === auth.id));
    }
    setLiked(currentItem?.reactions.find((item) => item.userId === auth.id));
  }, [currentItem?.reactions, auth.id, currentItem]);
  if (getSingleItemLoading || !currentItem) {
    return <Loading />;
  }
  return (
    <ItemContainer>
      <BreadCrumb
        paths={[
          { path: '/', icon: Home, title: 'Home' },
          { path: `/item/${itemId}`, icon: FileCopy, title: 'Item' },
        ]}
      />
      <TopContainer>
        <ItemCard />
        {auth.id === currentItem?.collection.author?.id && (
          <Box
            sx={{
              diaplay: 'flex',
              alignItems: 'center',
              gap: '10px',
              alignSelf: 'flex-end',
            }}
          >
            <Link
              to={`/edit-item/${currentItem.id}`}
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
            <Button onClick={()=>{
              dispatch(unreactItem({reactionId:(liked as any).id}))
            }}>
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
              onSuccess: () => {
                setConfirmDialog(null);
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
`;

const ItemContainer = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-items: center;
  padding: 20px;
  align-items: center;
`;

const LikeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export default ItemDetails;
