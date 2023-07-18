import {Button} from '@mui/material'
import styled from 'styled-components'
import { AuthTypes } from '../../types/common';

interface ISocialButtonProps {
    social:string;
    form:AuthTypes
    src: string;
    onClick:()=>void;
}

const SocialButton = ({social,src,form,onClick}:ISocialButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
        {form==='login'?'Sign in':'Sign Up'} With {social}
        <SocialImg src={src} alt='socials'/>
    </StyledButton>
  )
}

const StyledButton=styled(Button)`
    display:flex;
    align-items:center;
    gap:5px;
    border:1px solid #c4c4c4 !important;
`

const SocialImg=styled.img`
    width:30px;
    height:30px;
    border-radius:50%;
`

export default SocialButton;