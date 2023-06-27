import { Paper, Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { AnimateKeyframes } from 'react-simple-animate';

import { reactions } from '../../utils/reactions';

interface IReactionProps {
  setIsEmojiShown: Dispatch<SetStateAction<boolean>>;
  animationPause: boolean;
  setAnimationPause: Dispatch<SetStateAction<boolean>>;
  bottomPx: string;
  emojiSize?:number;
  action:(name:string)=>void;
}

const Reaction = ({
  animationPause,
  setAnimationPause,
  bottomPx,
  emojiSize,
  action
}: IReactionProps) => {
  return (
    <ReactionWrapper
      bottomPx={bottomPx}
      onMouseLeave={() => setAnimationPause(false)}
      onMouseOver={() => setAnimationPause(true)}
    >
      {reactions.map((reaction) => (
        <AnimateKeyframes
          duration={0.5}
          iterationCount="infinite"
          play
          pause={animationPause}
          direction="alternate"
          keyframes={[
            { transform: 'rotateZ(30deg)' },
            { transform: 'rotateZ(-30deg)' },
          ]}
        >
          <Box onClick={()=>action(reaction.name)} sx={{ cursor: 'pointer' }} key={reaction.name}>
            <Typography sx={{fontSize:emojiSize}}>{reaction.emoji}</Typography>
          </Box>
        </AnimateKeyframes>
      ))}
    </ReactionWrapper>
  );
};

const ReactionWrapper = styled(({ bottomPx, ...rest }: any) => (
  <Paper {...rest} />
))`
  border-radius: 20px;
  position: absolute;
  display: flex;
  bottom: ${({ bottomPx }) => (bottomPx ? bottomPx : '15px')};
`;
export default Reaction;
