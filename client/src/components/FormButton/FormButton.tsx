import React from "react";
import FormStyledButton from "./StyledFormButton"

interface IFormButtonProps {
    text:string;
    variant:"contained" | 'outlined';
}

const FormButton: React.FC<IFormButtonProps> = ({text,variant}) => {
  return (
    <FormStyledButton variant={variant} fullWidth>{text}</FormStyledButton>
  )
}

export default FormButton