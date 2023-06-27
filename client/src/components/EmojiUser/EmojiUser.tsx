import { styled } from 'styled-components';
import { ReactionMapper } from '../../types/reaction';
import Avatar from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png';
import { Typography} from '@mui/material';
import { reactions } from '../../utils/reactions';

interface IEmojiUserProps {
  react: ReactionMapper;
}

const EmojiUser = ({ react }: IEmojiUserProps) => {
  return (
    <EmojiContainer>
      <LeftContainer>
        <EmojiWrapper>
          <Avatar
            src={react.user.profileImage || AvatarImg}
            width={40}
            height={40}
          />
          <Typography sx={{position:'absolute',bottom:'1px',right:'-5px'}}>{reactions.find(item=>item.name===react.emoji)?.emoji}</Typography>
        </EmojiWrapper>

        <Typography>
          {react.user.firstName} {react.user.lastName}
        </Typography>
      </LeftContainer>
    </EmojiContainer>
  );
};

const EmojiWrapper = styled.div`
  position: relative;
`;

const EmojiContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  align-items: center;
`;
const LeftContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export default EmojiUser;
