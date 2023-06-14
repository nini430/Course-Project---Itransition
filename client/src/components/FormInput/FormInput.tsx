import {TextField} from '@mui/material'
import styled from 'styled-components'
import {FocusEventHandler,ChangeEventHandler} from 'react';


interface IFormInputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  error:boolean;
  value:string;
  onBlur:FocusEventHandler<HTMLInputElement>
  onChange:ChangeEventHandler<HTMLInputElement>
  mode:'dark'|'light'
}

const FormInput: React.FC<IFormInputProps> = ({ type, placeholder, name,error,value,onChange, onBlur,mode }) => {
  return <StyledInputEl mode={mode} onBlur={onBlur} value={value} onChange={onChange} error={error}  type={type} placeholder={placeholder} name={name} />;
};

const StyledInputEl=styled(({mode,...props}:any)=>(<TextField {...props}/>))`

    fieldset {
      border-color:${({mode})=>mode==='dark'?'white':'black'} !important;
    }
`

export default FormInput;
