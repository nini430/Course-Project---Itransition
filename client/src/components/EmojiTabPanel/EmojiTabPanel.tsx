import {TabPanel} from '@mui/lab'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { ReactionMapper } from '../../types/reaction'
import EmojiUser from '../EmojiUser/EmojiUser'

interface EmojiTabPanelProps {
    reactEl: ReactionMapper[] | null;
    emoji:string;
}

const EmojiTabPanel = ({reactEl,emoji}:EmojiTabPanelProps) => {
  return (
    <TabPanel value={emoji} >
    <ReactsList>
      {reactEl
        ?.filter((item) => item.emoji === emoji)
        .map((react) => (
          <Link
            to={`/profile/${react.user.id}`}
            style={{ textDecoration: 'none' }}
          >
            <EmojiUser key={react.id} react={react} />
          </Link>
        ))}
    </ReactsList>
  </TabPanel>
  )
}

const ReactsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EmojiTabPanel;