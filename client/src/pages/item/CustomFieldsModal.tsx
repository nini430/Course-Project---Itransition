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

interface ICustomFieldsModalProps {
  open: any;
  itemId:string;
  onClose: () => void;
}

const CustomFieldsModal = ({ open, onClose,itemId }: ICustomFieldsModalProps) => {
  console.log(open);
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
        <Link to={`/edit-item/${itemId}`}  style={{textDecoration:'none'}}>
        <LoadingButton disabled={!open || Object.keys(open).length===0} startIcon={<Edit />}>Edit</LoadingButton></Link>     
        <Button onClick={onClose} startIcon={<Cancel />}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomFieldsModal;
