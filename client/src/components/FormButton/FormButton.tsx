import React from "react";
import FormStyledButton from "./StyledFormButton"

interface IFormButtonProps {
    text:string;
    variant:"contained" | 'outlined';
    disabled:boolean;
    onSubmit:()=>void;
    type?:"button"|"submit"|"reset";
}

const FormButton: React.FC<IFormButtonProps> = ({text,variant, onSubmit, disabled, type}) => {
  return (
    <FormStyledButton disabled={disabled} type={type}  onSubmit={onSubmit}  variant={variant} fullWidth>{text}</FormStyledButton>
  )
}

export default FormButton