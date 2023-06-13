import {Divider, Typography, FormGroup} from '@mui/material'
import {Lan, LockClockRounded} from '@mui/icons-material';
import {useMediaQuery} from 'react-responsive';
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import { AuthContainer, AuthForm, LngContainer } from "./AuthStyles";
import StyledInput from '../../components/StyledFormInput';
import FormButton from '../../components/FormButton/FormButton';
import LanguageDropDown from '../../components/LanguageDropDown/LanguageDropDown';

const Login = () => {
  const {t}=useTranslation();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isBigScreen = useMediaQuery({ minWidth: 1824 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  return (
    <AuthContainer>
      <LanguageDropDown/>
       <AuthForm isXS={isExtraSmallDevice} isX={isBigScreen} isMob={isTabletOrMobile} isD={isDesktopOrLaptop}>
        <Typography sx={{alignSelf:'center',fontSize:20}}>{t('auth.login')}</Typography>
        <LockClockRounded sx={{alignSelf:'center',width:40, height:40,color:'primary.main'}}/>
        <Divider sx={{my:'20px'}}/>
        <FormGroup sx={{marginBottom:2}}>
        <StyledInput name="email" placeholder="E-mail" type="email"/>
        </FormGroup>
        <FormGroup sx={{marginBottom:2}}>
        <StyledInput name="password" placeholder="Password" type="password"/>
        </FormGroup>
        <FormButton variant="contained" text="Sign In"/>
        <Typography sx={{alignSelf:'center',my:'10px',color:'primary.main'}}>Not have an account? <Link to='/register'><span>Sign Up</span></Link></Typography>
       </AuthForm>
    </AuthContainer>
  )
}



export default Login;