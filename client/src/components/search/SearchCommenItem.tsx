import styled from 'styled-components';
import Item from '../Item/Item';
import { Box, Typography } from '@mui/material';
import Avatar from '../Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png'

const SearchCommentItem = () => {
  return (
    <Container>
      <Item
        item={{
          name: 'omagaaa',
          id: '12345',
          collection: {
            name: 'Collection 1',
            author: { id: '23', firstName: 'nincho', lastName: 'gogata' },
          },
        }}
      />
      <Box sx={{display:'flex',alignItems:'center',gap:'5px'}}>
      <Avatar width={30} height={30} src={AvatarImg}/>:
      <Typography>And I was very very cool sided </Typography>
      </Box>
      
    </Container>
  );
};

const Container = styled.div`
  border:1px solid gray;
  padding:10px;
  display:flex;
  flex-direction:column;
  gap:5px;
`;

export default SearchCommentItem;
