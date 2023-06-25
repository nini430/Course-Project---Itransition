import { Typography } from '@mui/material';
import moment from 'moment'
import ShowMore from 'react-show-more'

import styled from 'styled-components';
import CommentAvatar from './shared/CommentAvatar';



const Comment = () => {
  return (
    <CommentContainer>
      <LeftCommentSection>
        <CommentAvatar/>
      </LeftCommentSection>
      <CenterCommentSection>
        <ShowMore lines={3} more='Show more' less='Show less'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsa
        nobis quo sapiente, minus eligendi maxime sit dignissimos quas
        laudantium explicabo cupiditate. Voluptate quisquam dolore animi in
        consequatur! Sint, alias? Vero illum, doloribus quas reprehenderit fugit
        aliquid esse accusantium quibusdam optio? Eaque obcaecati impedit
        nostrum rem minus delectus sit totam optio nisi, veniam, eveniet ut
        deserunt blanditiis voluptatibus tempore officiis aliquid ipsum, quasi
        aut dignissimos quia iure. Eos dolore nam quia fugiat asperiores
        architecto praesentium ab, voluptatem autem minus facilis qui atque
        tempora provident accusamus. Molestias adipisci veniam, laborum
        praesentium, deserunt pariatur sunt repellendus dolor error officia,
        quis voluptas itaque!
        </ShowMore>
        
      </CenterCommentSection>
      <RightCommentSection>
        <Typography sx={{color:'gray',fontSize:12}}>{moment().format('HH:mm')}</Typography>
            
      </RightCommentSection>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap:10px;
`;

const LeftCommentSection = styled.div``;

const CenterCommentSection = styled.div``;

const RightCommentSection = styled.div``;

export default Comment;
