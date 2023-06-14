import React from 'react';
import StyledInput from './StyledFormInput';

interface IFormInputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  error:boolean;
  value:string;
  onChange:()=>void;
  onBlur:()=>void;
}

const FormInput: React.FC<IFormInputProps> = ({ type, placeholder, name,error,value,onChange, onBlur }) => {
  return <StyledInput onBlur={onBlur} value={value} onChange={onChange} error={error}  type={type} placeholder={placeholder} name={name} />;
};

export default FormInput;
