import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import Avatar from '../components/Avatar/Avatar';
import NoImage from '../assets/no-image.png';
import AvatarImg from '../assets/avatar.png';
import { Link } from 'react-router-dom';

const customizeCells = (
  value: any,
  viewCustom: any,
  item: any,
  viewReacts?: any,
  viewComments?: any,
  viewCollections?:any,
  viewFollows?:any
) => {
  if (value.count) {
    return (
      <span
        onClick={
          value.name === 'react'
            ? () => viewReacts(value.data)
            : value.name === 'comments'
            ? () => viewComments(value.data)
            : value.name==='collection'? ()=>viewCollections(value.data)
            : value.name==='follow'? ()=>viewFollows(value.data)
            : ()=>{throw new Error('No name matched')}
        }
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
      >
        {value.data.length}
      </span>
    );
  } else if (value.date) {
    return moment(value.data).format('L');
  } else if (value.foreign) {
    return (
      <Link to={`/${value.name}/${value.id}`} style={{textDecoration:'none'}}>
      <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <Avatar
          width={40}
          height={40}
          src={
            value?.data?.src ||
            (value?.data?.fallbackSrc === 'no-image' ? NoImage : AvatarImg)
          }
        />
        <Typography>{value?.data?.name}</Typography>
      </Box>
      </Link>
      
    );
  } else if (value.action && value.link) {
    return (
      <Link to={value.link} style={{ textDecoration: 'none' }}>
        <Button sx={{ border: '1px solid gray' }}>{value.data}</Button>
      </Link>
    );
  } else if (value.action && value.custom) {
    return (
      <Button
        sx={{ border: '1px solid gray' }}
        onClick={() => viewCustom && viewCustom(item)}
      >
        {value.data}
      </Button>
    );
  } else if (value.action) {
    return <Button sx={{ border: '1px solid gray' }}>{value.data}</Button>;
  } else {
    return value;
  }
};

export { customizeCells };
