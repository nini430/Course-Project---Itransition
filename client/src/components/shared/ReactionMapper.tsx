import { Dialog, DialogContent, Tab } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';
import { reactions } from '../../utils/reactions';
import { ReactionMapper as ReactionMapperType } from '../../types/reaction';
import EmojiUser from '../EmojiUser/EmojiUser';
import { Link } from 'react-router-dom';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import EmojiTabPanel from '../EmojiTabPanel/EmojiTabPanel';

interface IReactionMapperProps {
  open: ReactionMapperType[];
  onClose: () => void;
}

const ReactionMapper = ({ open, onClose }: IReactionMapperProps) => {
  const [selectedTab, setSelectedTab] = useState('all');
  return (
    <Dialog onClose={onClose} open={!!open}>
      <DialogContent sx={{ minWidth: 500, maxHeight:'300px', overflowY:'auto' }}>
        <TabContext value={selectedTab}>
          <TabList TabIndicatorProps={{style:{borderColor:'gray !important'}}} onChange={(e, value) => setSelectedTab(value)}>
            <StyledTab
              sx={{ minWidth: '30px !important' }}
              value="all"
              label="All"
            />
            {reactions.map((item) => (
              <StyledTab value={item.name} label={item.emoji} />
            ))}
          </TabList>
          <TabPanel value="all" tabIndex={0}>
            <ReactsList>
              {open?.map((react) => (
                <Link
                  to={`/profile/${react.user.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <EmojiUser key={react.id} react={react} />
                </Link>
              ))}
            </ReactsList>
          </TabPanel>
          {reactions.map(reaction=>(
            <EmojiTabPanel  reactEl={open} key={reaction.name} emoji={reaction.name} />
          ))}
         
        </TabContext>
      </DialogContent>
    </Dialog>
  );
};

const ReactsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTab = styled(Tab)`
  min-width: 50px !important;
`;

export default ReactionMapper;
