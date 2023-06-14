import {TextField} from '@mui/material'
import {FocusEventHandler,ChangeEventHandler} from 'react';


interface IFormInputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  error:boolean;
  value:string;
  onBlur:FocusEventHandler<HTMLInputElement>
  onChange:ChangeEventHandler<HTMLInputElement>
}

const FormInput: React.FC<IFormInputProps> = ({ type, placeholder, name,error,value,onChange, onBlur }) => {
  return <TextField onBlur={onBlur} value={value} onChange={onChange} error={error}  type={type} placeholder={placeholder} name={name} />;
};

export default FormInput;
