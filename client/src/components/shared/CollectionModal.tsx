import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import Avatar from '../Avatar/Avatar';
import NoImage from '../../assets/no-image.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Collection } from '../../types/collection';

interface ICollectionModalProps {
  open?: null | Collection[];
  onClose: () => void;
}

const CollectionModal = ({ open, onClose }: ICollectionModalProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          minWidth: 400,
        }}
      >
        {open && open.length === 0 && (
          <Typography sx={{ fontSize: 28 }}>
            {t('common.no_records_yet')}
          </Typography>
        )}
        {open?.map((item) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            key={item.id}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Avatar width={50} height={50} src={item?.image || NoImage} />
              <Typography>{item?.name}</Typography>
            </Box>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/collection/${item.id}`}
            >
              <Button sx={{ border: '1px solid gray' }}>
                {t('common.view')}
              </Button>
            </Link>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CollectionModal;
