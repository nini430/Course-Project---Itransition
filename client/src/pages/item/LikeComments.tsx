import styled from 'styled-components';
import { Box, Card, Divider, Typography } from '@mui/material';
import Comment from '../../components/Comment/Comment';
import AddComment from '../../components/Comment/AddComment';
import { useAppSelector } from '../../store/store';
import Loading from '../../components/Loading/Loading';
import Empty from '../../components/Empty/Empty';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface ILikeCommentProps {
  socket: Socket | null;
}

const LikeComments = ({socket}:ILikeCommentProps) => {
  const { t } = useTranslation();
  const { getSingleItemLoading, currentItem } = useAppSelector(
    (state) => state.item
  );
  const { authedUser } = useAppSelector((state) => state.auth);
  if (!currentItem || getSingleItemLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Typography sx={{ mb: 2 }}>
        {currentItem.comments.length} {t('item.comments')}
      </Typography>
      <LikeCommentContainer>
        {currentItem.comments.length === 0 ? (
          <Empty message={t('common.no_comments')} />
        ) : (
          currentItem.comments.map((comment) => (
            <>
              <Comment comment={comment} />
              <Divider sx={{ color: 'gray' }} />
            </>
          ))
        )}
      </LikeCommentContainer>
      {authedUser ? (
       <AddComment socket={socket} />
      
      ):  <Box sx={{p:2,borderTop:'1px solid gray'}}>
      <Typography sx={{textAlign:'center'}}>{t('common.please')} <Link to='/login'>{t('auth.enter')}</Link> {t('action.to_post_comment')}</Typography>
     </Box>}
      
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  min-width: 80%;
  padding: 20px;
`;
const LikeCommentContainer = styled.div`
  max-height: 300px;
  height: 300px;
  overflow-y: auto !important;
`;

export default LikeComments;
