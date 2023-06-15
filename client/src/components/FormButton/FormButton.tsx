import { LoadingButton } from '@mui/lab';

interface IFormButtonProps {
  text: string;
  variant: 'contained' | 'outlined';
  disabled: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading: boolean;
}

const FormButton: React.FC<IFormButtonProps> = ({
  text,
  variant,
  disabled,
  type,
  loading,
}) => {
  return (
    <LoadingButton
      loading={loading}
      color="primary"
      disabled={disabled}
      type={type}
      variant={variant}
      fullWidth
    >
      {text}
    </LoadingButton>
  );
};

export default FormButton;
