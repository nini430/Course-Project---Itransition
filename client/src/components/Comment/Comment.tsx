import { Typography, IconButton, Button } from '@mui/material';
import moment from 'moment'
import ShowMore from 'react-show-more'
import {useState} from 'react'

import styled from 'styled-components';
import CommentAvatar from './shared/CommentAvatar';
import { Comment as CommentType } from '../../types/comment';
import { MoreVert } from '@mui/icons-material';
import ActionButtons from './ActionButtons';

interface ICommentProps {
  comment:CommentType
}

const Comment = ({comment}:ICommentProps) => {
  const [isMoreShown,setIsMoreShown]=useState(false);
  return (
    <CommentContainer>
      <LeftCommentSection>
        <CommentAvatar src={comment.author?.profileImage} fullName={`${comment.author?.firstName} ${comment.author?.lastName}`}/>
      </LeftCommentSection>
      <CenterCommentSection>
        {comment.text.length>50? (
          <ShowMore lines={1} more='Show more' less='Show less'>
          {comment?.text}
          </ShowMore>
        ): comment.text}
        <ReactionContainer>
        <Typography sx={{textDecoration:'underline',cursor:'pointer',fontSize:12}}>Like</Typography>
        </ReactionContainer>
       
      </CenterCommentSection>
      <RightCommentSection>
        {isMoreShown && <ActionButtons/>}
        <IconButton onClick={()=>setIsMoreShown(prev=>!prev)}>
        <MoreVert/>
        </IconButton>
      
        <Typography sx={{color:'gray',fontSize:12}}>{moment(comment?.updatedAt).format('HH:mm')}</Typography>
         
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

const ReactionContainer=styled.div``

const LeftCommentSection = styled.div``;

const CenterCommentSection = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;

const RightCommentSection = styled.div`
  position:relative;
`;

export default Comment;
