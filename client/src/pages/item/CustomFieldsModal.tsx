import { Cancel, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { User } from '../../types/auth';
import { useTranslation } from 'react-i18next';

interface ICustomFieldsModalProps {
  open: any;
  itemId:string;
  onClose: () => void;
  collectionId:string;
  collectionAuthor:User
}

const CustomFieldsModal = ({ open, onClose,itemId, collectionId, collectionAuthor }: ICustomFieldsModalProps) => {
  const {t}=useTranslation();
  const {authedUser}=useAppSelector(state=>state.auth);
  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogContent sx={{ minWidth: 400 }}>
        {open && Object.keys(open).length===0 && (
          <Typography>No Custom Fields for this item</Typography>
        )}
        {open ? (
          Object.entries(open)?.map(([key, value]) => (
            <Box>
              <Box
                sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
                key={key}
              >
                <Typography>{key}</Typography>
                <Typography>
                  {(value as any).type === 'boolean'
                    ? (value as any).value === true
                      ? 'Yes'
                      : 'No'
                    : (value as any).type === 'date'
                    ? moment((value as any).value).format('L')
                    : (value as any).value}
                </Typography>
              </Box>
              <Divider />
            </Box>
          ))
        ) : (
          <Typography>No Custom Fields</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {authedUser && (authedUser.id===collectionAuthor.id || authedUser.role==='ADMIN') && (
          <Link to={`/edit-item/${itemId}/${collectionId}`}  style={{textDecoration:'none'}}>
          <LoadingButton disabled={!open || Object.keys(open).length===0} startIcon={<Edit />}>{t('common.edit')}</LoadingButton></Link> 
        )}     
        <Button onClick={onClose} startIcon={<Cancel />}>
         {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomFieldsModal;
