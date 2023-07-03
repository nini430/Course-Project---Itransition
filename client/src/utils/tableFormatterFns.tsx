import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import Avatar from '../components/Avatar/Avatar';
import NoImage from '../assets/no-image.png';
import AvatarImg from '../assets/avatar.png';

const customizeCells = (value: any) => {
  if (value.count) {
    return value.data.length;
  } else if (value.date) {
    return moment(value.data).format('L');
  } else if (value.foreign) {
    return (
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
    );
  } else if (value.custom) {
    return <Button sx={{ border: '1px solid gray' }}>View</Button>;
  } else {
    return value;
  }
};

export { customizeCells };
