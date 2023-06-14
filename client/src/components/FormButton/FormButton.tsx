import {LoadingButton} from '@mui/lab'

interface IFormButtonProps {
    text:string;
    variant:"contained" | 'outlined';
    disabled:boolean;
    onSubmit:()=>void;
    type?:"button"|"submit"|"reset";
}

const FormButton: React.FC<IFormButtonProps> = ({text,variant, onSubmit, disabled, type}) => {
  return (
    <LoadingButton  disabled={disabled} type={type}  onSubmit={onSubmit}  variant={variant} fullWidth>{text}</LoadingButton>
  )
}

export default FormButton