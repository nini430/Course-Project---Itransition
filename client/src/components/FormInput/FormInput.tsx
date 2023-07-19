import { Input, FormGroup, IconButton, FormControl, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { FocusEventHandler, ChangeEventHandler } from 'react';
import { ErrorMessage } from '../../pages/auth/AuthStyles';

interface IFormInputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  error: boolean;
  value: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  mode: 'dark' | 'light';
  toggleType?: () => void;
  multiline?: any;
  errorMessage:string;
  touched:boolean;
}

const FormInput: React.FC<IFormInputProps> = ({
  type,
  placeholder,
  name,
  error,
  value,
  onChange,
  onBlur,
  mode,
  toggleType,
  multiline,
  errorMessage,
  touched
}) => {
  return (
    <FormGroup sx={{mb:2}}>
      <FormControl>
      <InputLabel>{placeholder}</InputLabel>
      <StyledInputEl
      multiline={multiline}
      rows={multiline ? 4 : 1}
      endAdornment={
        (name === 'password' ||
        name === 'confirmPassword' ||
        name === 'oldPassword' ||
        name === 'newPassword' ||
        name === 'confirmNewPassword')
          &&  (
                  <IconButton onClick={toggleType}>
                    {type === 'password' ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              )  
          
      }
      mode={mode}
      onBlur={onBlur}
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      error={error}
      type={type}
      name={name}
    />
    </FormControl>
    {error && touched && <ErrorMessage dangerouslySetInnerHTML={{__html:errorMessage}}/> }
    </FormGroup>
    
    
  );
};

const StyledInputEl = styled(({ mode, ...props }: any) => (
  <Input {...props} />
))`
  fieldset {
    border-color: ${({ mode }) =>
      mode === 'dark' ? 'white' : 'black'} !important;
  }
`;

export default FormInput;
