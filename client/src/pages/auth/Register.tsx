import {Divider, Typography, FormGroup} from '@mui/material'
import {PersonPin} from '@mui/icons-material';
import {useMediaQuery} from 'react-responsive';
import {Link} from 'react-router-dom'
import { AuthContainer, AuthForm } from "./AuthStyles";
import StyledInput from '../../components/StyledFormInput';
import FormButton from '../../components/FormButton/FormButton';

const Register = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isBigScreen = useMediaQuery({ minWidth: 1824 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  return (
    <AuthContainer>
       <AuthForm isXS={isExtraSmallDevice} isX={isBigScreen} isMob={isTabletOrMobile} isD={isDesktopOrLaptop}>
        <Typography sx={{alignSelf:'center',fontSize:20}}>Register</Typography>
        <PersonPin sx={{alignSelf:'center',width:40, height:40,color:'primary.main'}}/>
        <Divider sx={{my:'20px'}}/>
        <FormGroup sx={{marginBottom:2}}>
        <StyledInput/>
        </FormGroup>
        <FormGroup sx={{marginBottom:2}}>
        <StyledInput/>
        </FormGroup>
        <FormGroup sx={{marginBottom:2}}>
        <StyledInput/>
        </FormGroup>
        <FormGroup sx={{marginBottom:2}}>
        <StyledInput/>
        </FormGroup>
        <FormGroup sx={{marginBottom:2}}>
        <StyledInput/>
        </FormGroup>
        <FormButton variant="contained" text="Sign Up"/>
        <Typography sx={{alignSelf:'center',my:'10px',color:'primary.main'}}>Already A member? <Link to='/login'><span>Sign In</span></Link></Typography>
       </AuthForm>
    </AuthContainer>
  )
}



export default Register;