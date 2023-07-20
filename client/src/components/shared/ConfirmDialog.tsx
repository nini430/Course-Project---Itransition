import { Cancel, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IConfirmDialogProps {
  open: any;
  onClose: () => void;
  onOk: (param?: any) => void;
  loading: boolean;
}

const ConfirmDialog = ({
  open,
  onClose,
  onOk,
  loading,
}: IConfirmDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogContent>{t('common.sure')}</DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          onClick={() => onOk(open.id)}
          startIcon={<Save />}
        >
          {t('common.save')}
        </LoadingButton>
        <Button onClick={onClose} startIcon={<Cancel />}>
          {t('common.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
