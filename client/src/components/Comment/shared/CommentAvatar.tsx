import { Typography } from '@mui/material';
import styled from 'styled-components';
import Avatar from '../../Avatar/Avatar';
import AvatarImg from '../../../assets/avatar.png';

interface ICommentAvatarProps {
  src?: string;
  fullName?: string;
  isAdd?: boolean;
}

const CommentAvatar = ({ src, fullName, isAdd }: ICommentAvatarProps) => {
  return (
    <CommentAvatarWrapper>
      <Avatar width={30} height={30} src={src || AvatarImg} />
      {!isAdd && <Typography>{fullName}</Typography>}
    </CommentAvatarWrapper>
  );
};

const CommentAvatarWrapper = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

export default CommentAvatar;
