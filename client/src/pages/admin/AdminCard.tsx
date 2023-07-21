import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

import Avatar from '../../components/Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png';
import { useAppSelector } from '../../store/store';
import { useTranslation } from 'react-i18next';

const AdminCard = () => {
  const { authedUser } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.admin);
  const {t}=useTranslation();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<KeyboardArrowDown />}>
        {t('admin.admin_info')}
      </AccordionSummary>
      <AccordionDetails>
        <Avatar width={70} height={70} src={AvatarImg} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Typography sx={{ color: 'gray' }}>{t('admin.name')}:</Typography>
          <Typography>
            {authedUser?.firstName} {authedUser?.lastName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Typography sx={{ color: 'gray' }}>{t('auth.email')}:</Typography>
          <Typography>{authedUser?.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Typography sx={{ color: 'gray' }}>{t('admin.user_amount')}:</Typography>
          <Typography>{users?.length}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Typography sx={{ color: 'gray' }}>{t('admin.blocked_users')}:</Typography>
          <Typography>{users?.filter(user=>user.status.data==='blocked').length}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdminCard;
