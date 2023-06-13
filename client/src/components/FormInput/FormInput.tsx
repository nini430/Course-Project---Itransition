import React from "react";
import StyledInput from "../StyledFormInput"

interface IFormInputProps {
   type?:string;
   placeholder?:string;
   name?:string;
}

const FormInput: React.FC<IFormInputProps> = ({type,placeholder,name}) => {
  return (
    <StyledInput type={type} placeholder={placeholder} name={name} />
  )
}

export default FormInput;